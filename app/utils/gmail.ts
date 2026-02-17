
import { google } from "googleapis";
import { prisma } from "./db";

export async function getGmailClient(userId: string) {
    const account = await prisma.account.findFirst({
        where: {
            userId,
            provider: "google",
        },
    });

    if (!account || !account.access_token) {
        throw new Error("Google account not linked or access token missing");
    }

    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    auth.setCredentials({
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expiry_date: account.expires_at ? account.expires_at * 1000 : undefined,
    });

    // Handle token refresh if necessary
    auth.on("tokens", async (tokens) => {
        if (tokens.refresh_token) {
            await prisma.account.update({
                where: {
                    provider_providerAccountId: {
                        provider: "google",
                        providerAccountId: account.providerAccountId,
                    },
                },
                data: {
                    refresh_token: tokens.refresh_token,
                    access_token: tokens.access_token,
                    expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : undefined,
                },
            });
        } else if (tokens.access_token) {
            await prisma.account.update({
                where: {
                    provider_providerAccountId: {
                        provider: "google",
                        providerAccountId: account.providerAccountId,
                    },
                },
                data: {
                    access_token: tokens.access_token,
                    expires_at: tokens.expiry_date ? Math.floor(tokens.expiry_date / 1000) : undefined,
                },
            });
        }
    });

    return google.gmail({ version: "v1", auth });
}

export async function sendInvoiceReminder({
    userId,
    to,
    subject,
    body,
}: {
    userId: string;
    to: string;
    subject: string;
    body: string;
}) {
    const gmail = await getGmailClient(userId);

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
    const messageParts = [
        `To: ${to}`,
        "Content-Type: text/html; charset=utf-8",
        "MIME-Version: 1.0",
        `Subject: ${utf8Subject}`,
        "",
        body,
    ];
    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw: encodedMessage,
        },
    });
}
