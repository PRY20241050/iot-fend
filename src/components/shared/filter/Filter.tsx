import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FilterForm from "./FilterForm";

interface Props {
  isGauge: boolean;
}

export default function Filter({ isGauge }: Props) {
  return (
    <aside className="max-w-[35%] w-[270px]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Filtrar registros</CardTitle>
        </CardHeader>
        <FilterForm isGauge={isGauge} />
      </Card>
    </aside>
  );
}
