import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

const schema = z.object({
  org: z.string().min(1, "기관명을 입력하세요"),
  topic: z.string().optional(),
  date: z.string().optional(),
  headcount: z.coerce.number().int().min(0).optional(),
  needPlan: z.boolean().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  memo: z.string().optional(),
  website: z.string().optional() // honeypot
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }
    const data = parsed.data;
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const html = `
      <h2>문의 접수</h2>
      <ul>
        <li><b>기관명</b>: ${data.org}</li>
        <li><b>주제</b>: ${data.topic ?? "-"}</li>
        <li><b>일정</b>: ${data.date ?? "-"}</li>
        <li><b>인원</b>: ${data.headcount ?? "-"}</li>
        <li><b>강의계획서</b>: ${data.needPlan ? "요청" : "불필요"}</li>
        <li><b>담당자</b>: ${data.name ?? "-"}</li>
        <li><b>연락처</b>: ${data.phone ?? "-"}</li>
        <li><b>이메일</b>: ${data.email}</li>
        <li><b>메모</b>: ${(data.memo ?? "").replace(/</g, "&lt;")}</li>
      </ul>
    `;

    await sendEmail({ subject: `[EDU 문의] ${data.org}`, html });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, message: (e as Error).message }, { status: 500 });
  }
}

