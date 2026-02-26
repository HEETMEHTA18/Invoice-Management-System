import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

// For India, Fast2SMS is often cheaper/easier for small scale
// For 100% free, consider a Telegram Bot
const fast2smsKey = process.env.FAST2SMS_API_KEY;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

/**
 * Sends an SMS message. 
 * If Twilio is not configured, it logs to the console as a fallback.
 * For free-tier small scale in India, recommended alternatives: 
 * 1. Fast2SMS (Cheap/Free credits)
 * 2. Telegram Bot (Free)
 * 3. WhatsApp Business API (via providers like UltraMsg - paid)
 */
export async function sendSMS(to: string, message: string) {
    if (!client || !fromPhone) {
        console.log("------------------------------------------");
        console.log(`[SMS SIMULATION] To: ${to}`);
        console.log(`[SMS SIMULATION] Message: ${message}`);
        console.log("------------------------------------------");
        return { sid: "simulated-sms-id" };
    }

    // Basic normalization: if it's 10 digits and doesn't start with +, assume India (+91)
    let formattedTo = to.trim().replace(/\s+/g, "");
    if (formattedTo.length === 10 && !formattedTo.startsWith("+")) {
        formattedTo = `+91${formattedTo}`;
    } else if (!formattedTo.startsWith("+")) {
        if (formattedTo.startsWith("91") && formattedTo.length === 12) {
            formattedTo = `+${formattedTo}`;
        } else {
            formattedTo = `+${formattedTo}`;
        }
    }

    try {
        const response = await client.messages.create({
            body: message,
            from: fromPhone,
            to: formattedTo,
        });
        console.log("SMS sent successfully via Twilio:", response.sid);
        return response;
    } catch (error) {
        console.error("Failed to send SMS via Twilio:", error);

        // If it's a trial account error or similar, don't crash the whole invoice flow
        // Just log it and return null or handle gracefully in the caller
        if (process.env.NODE_ENV === "development") {
            console.log("Falling back to console log in development.");
            return { sid: "failed-but-logged" };
        }
        throw error;
    }
}
