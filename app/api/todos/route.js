import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const todo = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { error } = await supabase.from("todos").insert({
    ...todo,
    author: session.user.id,
  });

  return NextResponse.json({ error });
}
