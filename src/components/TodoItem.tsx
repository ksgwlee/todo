"use client";

import { useState, useRef, useEffect } from "react";
import type { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commit = () => {
    onEdit(todo.id, draft);
    setEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 border-b border-black/10 px-4 py-3 last:border-b-0 dark:border-white/10">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
        aria-label={`${todo.text} 완료 처리`}
      />

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft(todo.text);
              setEditing(false);
            }
          }}
          className="flex-1 rounded border border-blue-400 bg-transparent px-2 py-1 outline-none"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 cursor-text break-all ${
            todo.completed ? "text-black/40 line-through dark:text-white/40" : ""
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="삭제"
        className="shrink-0 rounded px-2 py-1 text-black/30 opacity-0 transition hover:bg-red-500/10 hover:text-red-600 group-hover:opacity-100 dark:text-white/30"
      >
        ✕
      </button>
    </li>
  );
}
