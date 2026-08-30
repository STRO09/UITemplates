import { cn } from "@/lib/utils";

/**
 * Optional card image.
 */
export function CardImage({ src, alt = "", className, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-52 w-full object-cover", className)}
      {...props}
    />
  );
}
