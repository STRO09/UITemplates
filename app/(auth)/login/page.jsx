"use client";

import { Button } from "@/components/common/button";
import { FormField, FormLabel, FormMessage } from "@/components/common/form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account.
          </p>
        </div>

        <form className="space-y-4">
          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />

            <FormMessage />
          </FormField>

          <FormField>
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="password">Password</FormLabel>

              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />

            <FormMessage />
          </FormField>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-2">
          <Button variant="outline">Continue with Google</Button>

          <Button variant="outline">Continue with GitHub</Button>

          <Button variant="outline">Continue with Facebook</Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}
