/**
 * Telegram Bot integration for 100% free notifications.
 * To use this:
 * 1. Create a bot via @BotFather on Telegram and get the TELEGRAM_BOT_TOKEN.
 * 2. Get your Chat ID via @userinfobot or by calling getUpdates API.
 * 3. Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to your .env
 */
export async function sendTelegramMessage(message: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.log("Telegram bot not configured. Skipping notification.");
        return null;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Telegram API Error:", data.description);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Telegram send failed:", error);
        return null;
    }
}
