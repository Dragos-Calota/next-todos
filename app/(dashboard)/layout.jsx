import Navbar from "@/components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Next Todos | Home",
};

export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) redirect("/login");

  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  );
}
