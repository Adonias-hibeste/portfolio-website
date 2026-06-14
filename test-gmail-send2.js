require('dotenv').config();
const fetch = require('node-fetch');

async function test() {
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const userEmail = process.env.GMAIL_USER_EMAIL;

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

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const name = "Test";
    const email = "test@example.com";
    const message = "This is a test message";

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

    const base64SafeEmail = Buffer.from(emailBody)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

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
        console.log("Error sending email:", await gmailResponse.text());
    } else {
        console.log("Email sent successfully:", await gmailResponse.json());
    }
}
test();
