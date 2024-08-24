"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type User } from "@supabase/supabase-js";
import { logout } from "./actions";

export function ClientDemoCard({ user }: { user: User | null }) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <CardDescription>Read the README to get started.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {user ? <div>Hey, {user.email}!</div> : <div>Not logged in</div>}
        <div>
          This project is a starter that gets many basic things set up,
          including Supabase Auth, shadcn/ui, the Next.js App Router, and tRPC.
          Speed run the setup for your project by using this template!
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-row gap-2">
          {user ? (
            <Button onClick={() => logout()} className="w-full">
              Logout
            </Button>
          ) : (
            <Link href="/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
