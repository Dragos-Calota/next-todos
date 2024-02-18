import TodoForm from "@/components/TodoForm";
import TodosList from "@/components/TodosList";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <TodoForm />
      <Suspense fallback={<Loading />}>
        <TodosList />
      </Suspense>
    </div>
  );
}
