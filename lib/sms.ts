// twilio dependency removed as per voice agent removal request
// import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

// For India, Fast2SMS is often cheaper/easier for small scale
// For 100% free, consider a Telegram Bot
const fast2smsKey = process.env.FAST2SMS_API_KEY;

// const client = accountSid && authToken ? twilio(accountSid, authToken) : null;
const client = null; // Twilio disabled

/**
 * Sends an SMS message. 
 * Simulated as Twilio has been removed.
 */
export async function sendSMS(to: string, message: string) {
    console.log("------------------------------------------");
    console.log(`[SMS SIMULATION] To: ${to}`);
    console.log(`[SMS SIMULATION] Message: ${message}`);
    console.log("------------------------------------------");

    return {
        sid: "simulated-sms-id",
        message: "SMS simulation active. Twilio dependency removed."
    };
}
