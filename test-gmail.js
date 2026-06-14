require('dotenv').config();
const fetch = require('node-fetch');

async function test() {
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

    console.log("Client ID:", clientId);

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
        console.log("Error:", await tokenResponse.text());
    } else {
        console.log("Success:", await tokenResponse.json());
    }
}
test();
