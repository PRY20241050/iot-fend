import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    description: z.string().optional(),
    setpm10limit: z.boolean().optional(),
    pm10limit: z
      .number()
      .min(0, { message: "El límite de PM10 debe ser mayor o igual a 0" }),
    setpm25limit: z.boolean().optional(),
    pm25limit: z
      .number()
      .min(0, { message: "El límite de PM2.5 debe ser mayor o igual a 0" }),
    setso2limit: z.boolean().optional(),
    so2limit: z
      .number()
      .min(0, { message: "El límite de SO2 debe ser mayor o igual a 0" }),
    setno2limit: z.boolean().optional(),
    no2limit: z
      .number()
      .min(0, { message: "El límite de NO2 debe ser mayor o igual a 0" }),
    setcolimit: z.boolean().optional(),
    colimit: z
      .number()
      .min(0, { message: "El límite de CO debe ser mayor o igual a 0" }),
    email_alert: z.boolean().optional(),
    app_alert: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.setpm10limit && data.pm10limit === undefined) {
        return false;
      }
      if (data.setpm25limit && data.pm25limit === undefined) {
        return false;
      }
      if (data.setso2limit && data.so2limit === undefined) {
        return false;
      }
      if (data.setno2limit && data.no2limit === undefined) {
        return false;
      }
      if (data.setcolimit && data.colimit === undefined) {
        return false;
      }
      return true;
    },
    {
      message:
        "Debe definir el límite de gas si la opción correspondiente está activada",
      path: ["pm10limit", "pm25limit", "so2limit", "no2limit", "colimit"],
    }
  )
  .refine(
    (data) => {
      return (
        data.setpm10limit ||
        data.setpm25limit ||
        data.setso2limit ||
        data.setno2limit ||
        data.setcolimit
      );
    },
    {
      message: "Debe definir al menos un límite de gas",
      path: ["pm10limit", "pm25limit", "so2limit", "no2limit", "colimit"],
    }
  );

export type EmissionsLimitAddFormValues = z.infer<typeof formSchema>;

export default function useEmissionsLimitAddForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmissionsLimitAddFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      setpm10limit: false,
      pm10limit: undefined,
      setpm25limit: false,
      pm25limit: undefined,
      setso2limit: false,
      so2limit: undefined,
      setno2limit: false,
      no2limit: undefined,
      setcolimit: false,
      colimit: undefined,
      email_alert: false,
      app_alert: false,
    },
    reValidateMode: "onChange",
  });

  function onSubmit(values: EmissionsLimitAddFormValues) {
    setIsLoading(true);
  }

  return {
    form,
    isLoading,
    onSubmit,
  };
}
