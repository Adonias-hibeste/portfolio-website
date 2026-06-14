import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Check if Gmail credentials are configured
        const clientId = process.env.GMAIL_CLIENT_ID;
        const clientSecret = process.env.GMAIL_CLIENT_SECRET;
        const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
        const userEmail = process.env.GMAIL_USER_EMAIL || 'adonias.software.developer@gmail.com';

        if (!clientId || !clientSecret || !refreshToken) {
            console.error('Gmail OAuth2 environment variables are not configured');
            return NextResponse.json(
                { error: 'Email service is not configured. Please contact the administrator.' },
                { status: 500 }
            );
        }

        // 1. Exchange Refresh Token for Access Token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }),
        });

        if (!tokenResponse.ok) {
            const tokenErr = await tokenResponse.text();
            console.error('Failed to retrieve Google Access Token:', tokenErr);
            return NextResponse.json(
                { error: 'Failed to retrieve access token' },
                { status: 500 }
            );
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 2. Construct raw RFC 822 Email Message
        const subject = `Portfolio Contact from ${name}`;
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        
        const emailBody = [
            `From: ${userEmail}`,
            `To: adonias.software.developer@gmail.com`,
            `Reply-To: ${email}`,
            `Subject: ${utf8Subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=utf-8`,
            ``,
            `<h2>New Contact Form Submission</h2>`,
            `<p><strong>Name:</strong> ${name}</p>`,
            `<p><strong>Email:</strong> ${email}</p>`,
            `<p><strong>Message:</strong></p>`,
            `<p>${message.replace(/\n/g, '<br>')}</p>`
        ].join('\r\n');

        // Safe Base64URL encoding for Gmail API
        const base64SafeEmail = Buffer.from(emailBody)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        // 3. Send email via Gmail API
        const gmailResponse = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                raw: base64SafeEmail
            })
        });

        if (!gmailResponse.ok) {
            const gmailErr = await gmailResponse.text();
            console.error('Gmail API Error response:', gmailErr);
            return NextResponse.json(
                { error: 'Failed to send email via Gmail API' },
                { status: 500 }
            );
        }

        const gmailData = await gmailResponse.json();

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
            emailId: gmailData.id
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to process your message' },
            { status: 500 }
        );
    }
}
