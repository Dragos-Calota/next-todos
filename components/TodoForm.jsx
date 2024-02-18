"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoForm() {
  const [todoTitle, setTodoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const addTodo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const todo = {
      title: todoTitle,
    };

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    const { error } = await res.json();
    if (error) console.log(error.message);
    if (!error) {
      setIsLoading(false);
      setTodoTitle("");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={addTodo}
      className="w-2/5 grid grid-cols-6 gap-5 text-center p-5"
    >
      <p className="text-xl col-span-6 text-start font-bold">Add a new Todo</p>
      <input
        type="text"
        className="input input-secondary col-span-4"
        placeholder="Title"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button
        disabled={isLoading}
        className="btn btn-secondary col-span-2 font-bold text-lg"
      >
        {isLoading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}
