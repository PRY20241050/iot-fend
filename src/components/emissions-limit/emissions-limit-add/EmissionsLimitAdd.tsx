import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LayoutPrimary } from "@/components/layouts";
import EmissionsLimitAddForm from "./EmissionsLimitAddForm";
import s from "./EmissionsLimitAdd.module.scss";

export default function EmissionsLimitAdd() {
  return (
    <LayoutPrimary>
      <TypographyH1 className="text-2xl lg:text-3xl">
        Establecer nuevo límite de emisiones
      </TypographyH1>
      <TypographyP className={s.subtitle}>
        Añade un nuevo límite para el control de las emisiones de tu ladrillera
      </TypographyP>
      <DropdownMenuSeparator className="my-4 h-[2px]" />
      <EmissionsLimitAddForm />
    </LayoutPrimary>
  );
}
