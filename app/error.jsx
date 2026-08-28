"use client";

/**
 * Route Error UI
 *
 * Catches unexpected runtime errors within this route segment.
 */
export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">
        Something went wrong.
      </h2>

      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-primary px-4 py-2 text-sm text-white"
      >
        Try again
      </button>
    </div>
  );
}