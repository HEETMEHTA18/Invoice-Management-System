const https = require('https');
require('dotenv').config();

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const CRON_SECRET = process.env.CRON_SECRET || process.env.REMINDER_CRON_SECRET;

if (!CRON_SECRET) {
    console.error('CRON_SECRET is not defined in .env');
    process.exit(1);
}

const url = new URL('/api/reminders/auto', SITE_URL);

const options = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${CRON_SECRET}`,
        'Content-Type': 'application/json',
    },
};

console.log(`Triggering auto reminders at ${url.toString()}...`);

const req = https.request(url, options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        try {
            const result = JSON.parse(data);
            console.log('Result:', JSON.stringify(result, null, 2));
        } catch (e) {
            console.log('Raw Response:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('Error triggering reminders:', error);
});

req.end();
