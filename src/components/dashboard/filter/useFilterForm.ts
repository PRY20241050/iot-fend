import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface FilterFormValues {
  dateFrom?: Date;
  dateTo?: Date;
  scale?: string;
  sensor?: string;
  gases: string[];
}

const formSchema = z
  .object({
    dateFrom: z.date({ message: "Fecha inválida" }).optional(),
    dateTo: z.date({ message: "Fecha inválida" }).optional(),
    scale: z.string().optional(),
    sensor: z.string().optional(),
    gases: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (!data.dateFrom && !data.dateTo) {
        return false;
      }

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
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateFrom: undefined,
      dateTo: new Date(),
      scale: "",
      sensor: "",
      gases: [],
    },
    reValidateMode: "onChange",
  });

  const onSubmit = (values: FilterFormValues) => {
    console.log(values);
  };

  return {
    form,
    onSubmit,
  };
}
