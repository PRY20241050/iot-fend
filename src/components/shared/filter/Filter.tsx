import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FilterForm from "./FilterForm";


export default function Filter() {
  return (
    <aside className="tablet-lg:max-w-[35%] tablet-lg:w-[270px]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Filtrar registros</CardTitle>
        </CardHeader>
        <FilterForm />
      </Card>
    </aside>
  );
}
