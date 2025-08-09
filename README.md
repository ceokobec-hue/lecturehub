# 김지백 EDU

Next.js 14(App Router) + TypeScript + TailwindCSS + shadcn/ui 기반 3페이지 사이트.

## 로컬 실행

```bash
npm i
npm run dev
```

http://localhost:3000

## 환경 변수 (.env.local)
```
RESEND_API_KEY=YOUR_RESEND_KEY
FROM_EMAIL=contact@yourdomain.com
TO_EMAIL=owner@example.com
```

## 배포(Vercel)
- GitHub에 푸시 후 Vercel에서 Import
- 프로젝트 Settings → Environment Variables에 위 값을 등록
- Deploy 버튼 클릭

## 데이터 변경
- `data/instructor.json`, `data/materials.json` 수정 시 SSG로 반영

## 접근성/성능
- `<label htmlFor>` 연결, 포커스 링 유지
- `next/image` 사용
- 모바일 우선, `max-w-screen-md`, `px-4`, 섹션 `space-y-6`
