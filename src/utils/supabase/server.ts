import { env } from "@/env";
import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type Database } from "@/lib/database.types";
import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const createServerClient = () => {
  const cookieStore = cookies();
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(
              name,
              value,
              options as unknown as Partial<ResponseCookie>,
            ),
          );
        },
      },
    },
  );
};
