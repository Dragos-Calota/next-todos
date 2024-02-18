import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DeleteTodoButton from "./DeleteTodoButton";
import CompleteTodoButton from "./CompleteTodoButton";

const getTodos = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("todos")
    .select()
    .eq("author", session.user.id);

  if (error) console.log(error.message);
  if (!error) {
    return data;
  }
};

export default async function TodosList() {
  const todos = await getTodos();

  return (
    <div className="w-2/5 bg-neutral rounded flex flex-col items-center p-5 m-2">
      {todos.length ? (
        todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center bg-secondary w-full rounded p-5 m-2 text-secondary-content"
          >
            <p className="w-5/6 text-lg font-bold truncate">
              {todo.title}
              {todo.completed ? (
                <span className="font-light">(completed)</span>
              ) : (
                ""
              )}
            </p>

            <div className="divider divider-horizontal divider-neutral" />
            <div className="flex justify-evenly items-center w-1/6">
              {todo.completed ? "" : <CompleteTodoButton id={todo.id} />}
              <DeleteTodoButton id={todo.id} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-xl font-bold text-secondary">
          There are no todos created.
        </p>
      )}
    </div>
  );
}
