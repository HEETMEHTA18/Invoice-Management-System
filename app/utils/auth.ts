import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
import { prisma } from "./db"
import nodemailer from "nodemailer"
import { MailtrapTransport } from "mailtrap"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
     Nodemailer({
      server: {},
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, provider }) {
        const transport = nodemailer.createTransport(
          MailtrapTransport({
            token: process.env.MAILTRAP_TOKEN!,
          })
        )

        const result = await transport.sendMail({
          from: {
            address: provider.from || "hello@demomailtrap.co",
            name: "Invoice Management",
          },
          to: email,
          subject: "Sign in to Invoice Management",
          text: `Sign in to Invoice Management\n\nClick the link below to sign in:\n${url}\n\nIf you did not request this email, you can safely ignore it.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Sign in to Invoice Management</h2>
              <p>Click the button below to sign in to your account:</p>
              <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; margin: 16px 0;">Sign In</a>
              <p style="color: #666; font-size: 14px;">Or copy and paste this link: ${url}</p>
              <p style="color: #999; font-size: 12px;">If you did not request this email, you can safely ignore it.</p>
            </div>
          `,
        })

        if (result.rejected?.length) {
          throw new Error(`Email delivery failed: ${result.rejected.join(", ")}`)
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
    newUser: "/dashboard",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      // Always redirect to dashboard
      return `${baseUrl}/dashboard`
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
})
