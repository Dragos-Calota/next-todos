import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AuthLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session) redirect("/");

  return (
    <>
      <div className="navbar bg-neutral">
        <p className="text-xl font-bold text-secondary px-2">Next Todos</p>
        <div className="divider divider-horizontal divider-secondary" />
        <Link href="/login" className="px-2 font-bold">
          Login
        </Link>
        <Link href="register" className="px-2 font-bold">
          Register
        </Link>
      </div>
      {children}
    </>
  );
}
