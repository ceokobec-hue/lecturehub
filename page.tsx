import { Metadata } from "next";
import materials from "@/data/materials.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialCard } from "@/components/cards/material-card";
import { Checklist } from "@/components/materials/checklist";
import { Quiz } from "@/components/materials/quiz";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "강의 자료",
  description: "체크리스트, 성향 퀴즈, 자료 다운로드",
};

type Item =
  | { id: string; type: "checklist"; title: string; items: string[] }
  | { id: string; type: "quiz"; title: string; questions: { q: string; options: string[] }[]; scoringNote: string }
  | { id: string; type: "file"; title: string; url: string };

const items = materials as Item[];

export default function MaterialsPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start gap-1">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="checklist">체크리스트</TabsTrigger>
          <TabsTrigger value="quiz">성격</TabsTrigger>
          <TabsTrigger value="file">자료</TabsTrigger>
        </TabsList>

        {(["all", "checklist", "quiz", "file"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {items
              .filter((x) => tab === "all" || x.type === tab)
              .map((x) => {
                if (x.type === "checklist") {
                  return (
                    <MaterialCard key={x.id} title={x.title} type={x.type}>
                      <Checklist id={x.id} items={x.items.map((t, idx) => ({ id: `${x.id}-${idx}`, text: t }))} />
                    </MaterialCard>
                  );
                }
                if (x.type === "quiz") {
                  return (
                    <MaterialCard key={x.id} title={x.title} type={x.type}>
                      <Quiz
                        id={x.id}
                        questions={(x as any).questions.map((q: any, qi: number) => ({
                          id: `${x.id}-q${qi + 1}`,
                          text: q.q,
                          options: q.options.map((o: string, oi: number) => ({ id: `${x.id}-q${qi + 1}-o${oi + 1}`, text: o, score: o === "그렇다" ? 2 : o === "보통" ? 1 : 0 }))
                        }))}
                        results={[
                          { min: 6, max: 8, text: "활동형" },
                          { min: 3, max: 5, text: "균형형" },
                          { min: 0, max: 2, text: "차분형" },
                        ]}
                      />
                    </MaterialCard>
                  );
                }
                return (
                  <MaterialCard key={x.id} title={x.title} type={x.type}>
                    <Button asChild>
                      <a href={(x as any).url} download>다운로드</a>
                    </Button>
                  </MaterialCard>
                );
              })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

