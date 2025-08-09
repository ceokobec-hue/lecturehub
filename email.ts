import { Resend } from "resend";
import nodemailer from "nodemailer";

export type EmailPayload = { subject: string; html: string };

export async function sendEmail(payload: EmailPayload) {
  const provider = process.env.EMAIL_PROVIDER || "resend";
  if (provider === "nodemailer") return sendWithNodemailer(payload);
  return sendWithResend(payload);
}

async function sendWithResend({ subject, html }: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY as string;
  const from = process.env.FROM_EMAIL as string;
  const to = process.env.TO_EMAIL as string;
  if (!apiKey || !from || !to) throw new Error("Resend env not set");
  const resend = new Resend(apiKey);
  const res = await resend.emails.send({ from, to, subject, html });
  if (res.error) throw new Error(res.error.message);
  return res;
}

async function sendWithNodemailer({ subject, html }: EmailPayload) {
  const host = process.env.SMTP_HOST as string;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER as string;
  const pass = process.env.SMTP_PASS as string;
  const from = process.env.FROM_EMAIL as string;
  const to = process.env.TO_EMAIL as string;
  if (!host || !user || !pass || !from || !to) throw new Error("SMTP env not set");
  const transporter = nodemailer.createTransport({ host, port, auth: { user, pass } });
  const info = await transporter.sendMail({ from, to, subject, html });
  return info;
}

