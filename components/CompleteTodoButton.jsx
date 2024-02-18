"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompleteTodoButton({ id }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const completeTodo = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: true,
      }),
    });

    const { error } = await res.json();

    if (error) console.log(error);
    if (!error) router.refresh();

    setIsLoading(false);
  };

  return (
    <button
      className="btn btn-ghost btn-sm"
      disabled={isLoading}
      onClick={() => completeTodo()}
    >
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
}
