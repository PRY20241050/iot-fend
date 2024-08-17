import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Brickyard } from "@/types/brickyard";
import { dashboardBrickyardPath } from "@/lib/utils";

interface Props {
  data: Brickyard;
}

export function BrickyardCard({ data }: Props) {
  const { push } = useRouter();

  const handleClick = () => {
    push(dashboardBrickyardPath(String(data.id)));
  };

  return (
    <Card>
      <CardContent className="px-6 py-4 flex justify-between">
        <div className="space-y-2">
          <CardTitle>{data.name}</CardTitle>
          <div className="space-y-1">
            <CardDescription>Dirección: {data.address}</CardDescription>
            <CardDescription>Teléfono: {data.phone}</CardDescription>
            <CardDescription>RUC: {data.ruc}</CardDescription>
            <CardDescription>Email: {data.contact}</CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <DotsVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleClick}>
              Ver emisiones
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}

const Sk = () => {
  return (
    <div>
      <Skeleton className="w-full h-[150px]" />
    </div>
  );
};

BrickyardCard.Sk = Sk;
