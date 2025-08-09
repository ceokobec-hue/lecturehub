"use client";
import { useEffect, useState } from "react";
import { saveJSON, loadJSON } from "./lib/storage";
import { Button } from "./components/ui/button";

type ChecklistItem = { id: string; text: string };

export function Checklist({ id, items }: { id: string; items: ChecklistItem[] }) {
  const storageKey = `materials:${id}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = loadJSON<Record<string, boolean>>(storageKey, {});
    setChecked(saved);
  }, [storageKey]);

  useEffect(() => {
    saveJSON(storageKey, checked);
  }, [storageKey, checked]);

  const total = items.length;
  const doneCount = items.filter((i) => checked[i.id]).length;
  const all = total > 0 && doneCount === total;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">진행률: {doneCount}/{total}</div>
        <div className="flex gap-2">
          <Button
            variant={all ? "secondary" : "default"}
            onClick={() => {
              const next: Record<string, boolean> = {};
              for (const i of items) next[i.id] = true;
              setChecked(next);
            }}
          >
            전체 체크
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (all) {
                setChecked({});
              } else {
                const next: Record<string, boolean> = {};
                for (const i of items) next[i.id] = false;
                setChecked(next);
              }
            }}
          >
            전체 해제
          </Button>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex items-center gap-3">
            <input
              id={`${id}-${i.id}`}
              type="checkbox"
              className="h-5 w-5 rounded border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              checked={!!checked[i.id]}
              onChange={(e) => setChecked((prev) => ({ ...prev, [i.id]: e.target.checked }))}
            />
            <label htmlFor={`${id}-${i.id}`} className="text-sm">
              {i.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

