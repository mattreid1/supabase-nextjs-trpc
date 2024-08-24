"use server";

import { createServerClient } from "@/utils/supabase";
import { redirect } from "next/navigation";

export async function logout() {
  "use server";

  const supabase = createServerClient();
  await supabase.auth.signOut();

  redirect("/login");
}
