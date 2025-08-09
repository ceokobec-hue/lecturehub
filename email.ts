// email.ts — Resend만 사용 (nodemailer 완전 제거)
import { Resend } from "resend";

export type EmailPayload = { subject: string; html: string };

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL!;
const TO = process.env.TO_EMAIL!;

export async function sendEmail({ subject, html }: EmailPayload) {
  if (!process.env.RESEND_API_KEY || !FROM || !TO) {
    throw new Error("Missing RESEND_API_KEY / FROM_EMAIL / TO_EMAIL env.");
  }

  const result = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject,
    html,
  });

  if ((result as any)?.error) {
    throw new Error(JSON.stringify((result as any).error));
  }
  return result;
}

  const result = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject,
    html,
  });

  // 간단한 에러 처리
  if ((result as any).error) {
    throw new Error(JSON.stringify((result as any).error));
  }
  return result;
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

