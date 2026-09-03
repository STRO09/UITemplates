"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { SiGoogle, SiGithub, SiFacebook } from "@icons-pack/react-simple-icons";
import { FormField, FormLabel, FormMessage } from "@/components/common/form";
import { Button } from "@/components/common/button";
import { authClientApi } from "@/api/client/authClientApi";

const passwordRules = [
  {
    label: "8+ characters",
    test: (value) => value.length >= 8,
  },
  {
    label: "Alphabets",
    test: (value) => /[A-Za-z]/.test(value),
  },
  {
    label: "Numbers",
    test: (value) => /\d/.test(value),
  },
  {
    label: "Special characters",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValid = passwordRules.every((rule) => rule.test(password));

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const emailValid = email.trim().length > 0;

  const canSubmit = emailValid && passwordValid && passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    await authClientApi.register(data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Get started with your account.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}

          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />

            <FormMessage />
          </FormField>

          {/* Password */}

          <FormField>
            <FormLabel htmlFor="password">Password</FormLabel>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {passwordRules.map((rule) => {
                const valid = rule.test(password);

                return (
                  <div
                    key={rule.label}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      valid ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    {valid ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}

                    <span>{rule.label}</span>
                  </div>
                );
              })}
            </div>

            <FormMessage />
          </FormField>

          {/* Confirm password */}

          <FormField>
            <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />

            {confirmPassword.length > 0 && (
              <p
                className={`text-xs transition-colors ${
                  passwordsMatch ? "text-success" : "text-destructive"
                }`}
              >
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            )}

            <FormMessage />
          </FormField>

          <Button type="submit" className="w-full" disabled={!canSubmit}>
            Create account
          </Button>
        </form>

        {/* OAuth */}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs text-muted-foreground">OR</span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 p-0"
            aria-label="Continue with Google"
          >
            <SiGoogle className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 p-0"
            aria-label="Continue with GitHub"
          >
            <SiGithub className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 p-0"
            aria-label="Continue with Facebook"
          >
            <SiFacebook className="h-5 w-5" />
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
