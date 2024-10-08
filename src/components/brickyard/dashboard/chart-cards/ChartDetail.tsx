import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  value?: number | null;
  disabled?: boolean;
  className?: string;
};

export function DetailChart({
  title,
  description,
  value,
  disabled = false,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "p-4",
        { "bg-secondary text-muted-foreground": disabled },
        className
      )}
    >
      <CardTitle className="mb-1">{title}</CardTitle>
      <TypographyH3 className="overflow-x-hidden">{value ?? "-"}</TypographyH3>
      <CardDescription className="text-xs">{description}</CardDescription>
    </Card>
  );
}
