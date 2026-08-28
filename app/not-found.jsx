/**
 * Not Found UI
 *
 * Shown when a route or requested resource does not exist.
 *
 * To triger it from a server component
 * import { notFound } from "next/navigation";
 *
 * const project = await getProject(id);
 * if (!project) {
 * notFound();
 * }
 */

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">404</h1>

      <p className="text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}
