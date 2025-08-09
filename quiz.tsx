"use client";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Option = { id: string; text: string; score: number };
type Question = { id: string; text: string; options: Option[] };
type ResultBand = { min: number; max: number; text: string };

export function Quiz({ id, questions, results }: { id: string; questions: Question[]; results: ResultBand[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { score: number; text: string }>(null);

  const score = useMemo(() => {
    return questions.reduce((sum, q) => {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      return sum + (opt?.score ?? 0);
    }, 0);
  }, [answers, questions]);

  function finish() {
    const band = results.find((r) => score >= r.min && score <= r.max);
    setDone({ score, text: band?.text ?? "결과 없음" });
  }

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <Card key={q.id}>
          <CardContent className="space-y-3 p-4">
            <p className="font-medium">{q.text}</p>
            <div className="space-y-2">
              {q.options.map((o) => (
                <label key={o.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`${id}-${q.id}`}
                    value={o.id}
                    checked={answers[q.id] === o.id}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: o.id }))}
                    className="h-4 w-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <span>{o.text}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-2">
        <Button onClick={finish}>결과 보기</Button>
        <Button variant="outline" onClick={() => { setAnswers({}); setDone(null); }}>다시하기</Button>
      </div>
      {done && (
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-sm text-muted-foreground">총점: {done.score}</p>
            <p className="font-semibold">유형: {done.text}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

