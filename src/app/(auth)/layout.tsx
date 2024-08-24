import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/");

  return children;
}
