import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ChartDetail } from "@/types/dashboard";

type Props = Omit<ChartDetail, "id"> & {
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
    <Card className={cn("p-4", { "bg-secondary text-muted-foreground": disabled }, className)}>
      <CardTitle className="mb-1">{title}</CardTitle>
      <TypographyH3>{value}</TypographyH3>
      <CardDescription className="text-xs">{description}</CardDescription>
    </Card>
  );
}
