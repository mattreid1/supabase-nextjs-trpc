"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBrowserClient } from "@/utils/supabase/browser";

const signupFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Must be at least 8 characters"),
    passwordConfirm: z.string().min(8, "Must be at least 8 characters"),

    firstName: z.string(),
    lastName: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password2"],
        message: "Passwords don't match",
      });
    }
  });

export default function SignupPage() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit: Parameters<typeof form.handleSubmit>[0] = async (data) => {
    const { email, password, firstName, lastName } = data;

    const supabase = createBrowserClient();

    const emailRedirectTo = `${window.location.origin}/api/auth/callback`;

    const signupResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: {
          firstName,
          lastName,
        },
      },
    });

    if (signupResponse.error) {
      toast.error(`Error signing up - ${signupResponse.error.message}`);
      form.reset(data);
      throw signupResponse.error;
    }

    if (!signupResponse.data.user?.id) {
      const message = `Error signing up. That email might be taken already.`;
      toast.error(message);
      form.reset(data);
      throw new Error(message);
    }

    toast.success(`Check your email to confirm your signup.`);
  };

  return (
    <div className="col-span-12 flex flex-col items-center p-2 pt-8 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5 2xl:col-span-2 2xl:col-start-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account. You&apos;ll have to
                confirm your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} required placeholder="John" />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} required placeholder="Doe" />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            required
                            placeholder="example@gmail.com"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" required />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" required />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-col gap-4 text-center text-sm">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    form.formState.isSubmitSuccessful
                  }
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {form.formState.isSubmitSuccessful
                    ? "Check your email"
                    : "Create an account"}
                </Button>
                <div>
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Sign in
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Form>
      </form>
    </div>
  );
}
