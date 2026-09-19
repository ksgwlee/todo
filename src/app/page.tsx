"use client";

import { useMemo, useState } from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import TodoFooter from "@/components/TodoFooter";
import type { Filter } from "@/types/todo";

export default function Home() {
  const { todos, loaded, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, toggleAll } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);
  const allCompleted = todos.length > 0 && remaining === 0;

  return (
    <main className="flex flex-1 items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3 border-b border-black/10 px-4 py-4 dark:border-white/10">
          {todos.length > 0 && (
            <button
              onClick={() => toggleAll(!allCompleted)}
              aria-label="전체 완료 토글"
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs ${
                allCompleted
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-black/20 text-transparent dark:border-white/20"
              }`}
            >
              ✓
            </button>
          )}
          <h1 className="text-xl font-semibold">TODO</h1>
        </div>

        <TodoInput onAdd={addTodo} />

        {loaded && todos.length === 0 && (
          <p className="px-4 pb-6 text-center text-sm text-black/40 dark:text-white/40">
            할 일이 없습니다. 위에서 추가해 보세요.
          </p>
        )}

        {filtered.length > 0 && (
          <ul>
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <TodoFooter
            remaining={remaining}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            hasCompleted={hasCompleted}
          />
        )}
      </div>
    </main>
  );
}
