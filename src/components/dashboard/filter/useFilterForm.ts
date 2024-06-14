import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface FilterFormValues {
  rangeDate: {
    from?: string;
    to?: string;
  };
  scale?: string;
  sensor?: string;
  gases: string[];
}

const formSchema = z.object({
  rangeDate: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
  }),
  scale: z.string().optional(),
  sensor: z.string().optional(),
  gases: z.array(z.string()).optional(),
});

export default function useFilterForm() {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
