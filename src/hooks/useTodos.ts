"use client";

import { useCallback, useEffect, useState } from "react";
import type { Todo } from "@/types/todo";

const STORAGE_KEY = "todo-app:todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage; storage is an external system
    // not representable as a render-time value, so this must happen in an effect.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setTodos(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // ignore write failures (e.g. storage full/disabled)
    }
  }, [todos, loaded]);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed || t.text } : t))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const toggleAll = useCallback((completed: boolean) => {
    setTodos((prev) => prev.map((t) => ({ ...t, completed })));
  }, []);

  return { todos, loaded, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, toggleAll };
}
