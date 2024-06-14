import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography";
import { ChartDetail } from "@/types/dashboard";

interface Props {
  detail: ChartDetail;
}

export default function DetailChart({ detail }: Props) {
  return (
    <Card className="p-4 mt-2">
      <CardTitle className="mb-1">{detail.title}</CardTitle>
      <TypographyH3>{detail.amount}</TypographyH3>
      <CardDescription className="text-xs">{detail.description}</CardDescription>
    </Card>
  );
}
