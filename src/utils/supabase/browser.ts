import { createBrowserClient as createClient } from "@supabase/ssr";
import { type Database } from "@/lib/database.types";
import { env } from "@/env";

export const createBrowserClient = () =>
  createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
