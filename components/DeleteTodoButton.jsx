"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteTodoButton({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteTodo = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    const { error } = await res.json();

    if (error) console.log(error.message);
    if (!error) router.refresh();

    setIsLoading(false);
  };

  return (
    <button
      className="btn btn-ghost btn-sm"
      disabled={isLoading}
      onClick={() => deleteTodo()}
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
          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
        />
      </svg>
    </button>
  );
}
