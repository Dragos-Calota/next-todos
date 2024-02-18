import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("todos").delete().eq("id", params.id);

  return NextResponse.json({ error });
}
export async function PATCH(request, { params }) {
  const body = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase
    .from("todos")
    .update({ completed: body.completed })
    .eq("id", params.id);

  return NextResponse.json({ error });
}
