import { cn } from "@/lib/utils";

/**
 * Card heading and optional supporting content.
 */
export function CardHeader({
  badge,
  title,
  description,
  warning,
  className,
  titleClassName,
  descriptionClassName,
  warningClassName,
  ...props
}) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {badge && (
        <div className="w-fit rounded-md bg-surface px-2 py-1 text-xs text-foreground">
          {badge}
        </div>
      )}

      {title && (
        <h3
          className={cn(
            "text-xl font-semibold text-foreground",
            titleClassName,
          )}
        >
          {title}
        </h3>
      )}

      {description && (
        <p
          className={cn(
            "text-sm leading-relaxed text-muted-foreground",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}

      {warning && (
        <p className={cn("text-sm text-warning", warningClassName)}>
          {warning}
        </p>
      )}
    </div>
  );
}
