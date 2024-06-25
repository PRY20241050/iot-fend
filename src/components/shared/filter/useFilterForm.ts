import { useFilterStore } from "@/store/useFilterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface FilterFormValues {
  dateFrom?: Date;
  dateTo?: Date;
  scale?: string;
  device?: number;
  gases: number[];
}

const formSchema = z
  .object({
    dateFrom: z.date({ message: "Fecha inválida" }).optional(),
    dateTo: z.date({ message: "Fecha inválida" }).optional(),
    scale: z.string().optional(),
    device: z.number().optional(),
    gases: z.array(z.number()).optional(),
  })
  .refine(
    (data) => {
      if (data.dateFrom && data.dateTo) {
        return data.dateFrom <= data.dateTo;
      }
      return true;
    },
    {
      message: "La fecha de inicio debe ser menor a la fecha de fin",
      path: ["dateTo"],
    }
  );

export default function useFilterForm() {
  const { setFilter } = useFilterStore((state) => ({
    setFilter: state.setFilter,
  }));

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      scale: "",
      device: undefined,
      gases: [],
    },
    reValidateMode: "onChange",
  });

  const onSubmit = (values: FilterFormValues) => {
    setFilter(values);
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
}
