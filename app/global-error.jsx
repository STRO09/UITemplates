"use client";

/**
 * Global Error UI
 *
 * Last-resort fallback for errors that affect the root layout.
 */
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Something went wrong.</h1>

        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-primary px-4 py-2 text-sm text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
