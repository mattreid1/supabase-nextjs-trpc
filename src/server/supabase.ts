import { createClient as createClientSupabase } from "@supabase/supabase-js";
import { type Database } from "@/lib/database.types";
import { env } from "@/env";

export function createClient() {
  const supabase = createClientSupabase<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  return supabase;
}
