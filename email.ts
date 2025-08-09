// email.ts — Resend만 사용 (nodemailer 제거)
import { Resend } from "resend";

export type EmailPayload = { subject: string; html: string };

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.FROM_EMAIL || "";
const TO = process.env.TO_EMAIL || "";

export async function sendEmail({ subject, html }: EmailPayload) {
  if (!process.env.RESEND_API_KEY || !FROM || !TO) {
    throw new Error("Missing RESEND_API_KEY / FROM_EMAIL / TO_EMAIL env.");
  }

  const result = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject, // ← 파라미터에서 구조분해로 가져온 값 사용
    html,    // ← 파라미터에서 구조분해로 가져온 값 사용
  });

  if ((result as any)?.error) {
    throw new Error(JSON.stringify((result as any).error));
  }
  return result;
}
