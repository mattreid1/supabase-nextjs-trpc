import { ClientDemoCard } from "./client-page";
import { createServerClient } from "@/utils/supabase";

export default async function Home() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <ClientDemoCard user={user} />
    </main>
  );
}
