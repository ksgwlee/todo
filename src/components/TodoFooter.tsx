"use client";

import type { Filter } from "@/types/todo";

interface Props {
  remaining: number;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행중" },
  { key: "completed", label: "완료" },
];

export default function TodoFooter({
  remaining,
  filter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 px-4 py-3 text-sm dark:border-white/10">
      <span className="text-black/60 dark:text-white/60">{remaining}개 남음</span>

      <div className="flex gap-1 rounded-lg bg-black/5 p-1 dark:bg-white/10">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`rounded-md px-3 py-1 transition ${
              filter === key
                ? "bg-white shadow dark:bg-black/40"
                : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        className="text-black/60 hover:text-red-600 disabled:opacity-30 disabled:hover:text-black/60 dark:text-white/60 dark:disabled:hover:text-white/60"
      >
        완료 항목 삭제
      </button>
    </div>
  );
}
