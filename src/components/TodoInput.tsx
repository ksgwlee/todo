"use client";

import { useState, type FormEvent } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="flex-1 rounded-lg border border-black/10 bg-transparent px-4 py-2 outline-none focus:border-blue-500 dark:border-white/15"
        autoFocus
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-40"
        disabled={!value.trim()}
      >
        추가
      </button>
    </form>
  );
}
