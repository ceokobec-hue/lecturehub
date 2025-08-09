export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to LectureHub</h1>
      <p>이 페이지는 Vercel에서 정상적으로 배포되었는지 확인하는 테스트 페이지입니다.</p>
    </main>
  );
}
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "김지백 EDU - 홈",
  description: "김지백 강사의 소개, 강의 자료, 문의 안내",
};

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="text-center space-y-4">
        <h1 className="text-2xl font-bold">김지백 EDU</h1>
        <p className="text-muted-foreground">실무 중심 교육, 간결한 자료, 빠른 소통</p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/materials">강의 자료 보러가기</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">문의하기</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>강사 소개</CardTitle>
            <CardDescription>이력과 주요 강의 분야</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">실무-현장 결합 교육과정 설계 및 진행</p>
            <Button asChild variant="link" className="px-0">
              <Link href="/instructor">자세히 보기 →</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>수업 자료</CardTitle>
            <CardDescription>체크리스트, 성격유형 퀴즈, 자료 다운로드</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">모바일 우선으로 빠르게 확인</p>
            <Button asChild variant="link" className="px-0">
              <Link href="/materials">바로 가기 →</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle>강의 문의</CardTitle>
            <CardDescription>기관 맞춤형 커리큘럼 제안</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm">희망 일정/인원/주제를 알려주시면 견적과 강의안 드립니다.</p>
            <Button asChild>
              <Link href="/contact">문의 폼 작성</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

