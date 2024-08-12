import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LayoutPrimary } from "@/components/layouts";
import EmissionsLimitAddForm from "./EmissionsLimitAddForm";
import s from "./EmissionsLimitAdd.module.scss";
import { EmissionLimits } from "@/types/emission-limits";

interface Props {
  initialData?: EmissionLimits;
}

export default function EmissionsLimitAdd({ initialData }: Props) {
  return (
    <LayoutPrimary>
      <TypographyH1 className="text-2xl lg:text-3xl">
        Establecer nuevo límite de emisiones
      </TypographyH1>
      <TypographyP className={s.subtitle}>
        Añade un nuevo límite para el control de las emisiones de tu ladrillera
      </TypographyP>
      <DropdownMenuSeparator className="my-4 h-[2px]" />
      <EmissionsLimitAddForm initialData={initialData} />
    </LayoutPrimary>
  );
}
