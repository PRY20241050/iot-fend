import { useToast } from "@/components/ui/use-toast";
import { CO, DEFAULT_ERROR, getError, NO2, PM10, PM25, SO2 } from "@/lib/utils";
import {
  OPTIONAL_BOOLEAN,
  OPTIONAL_INTEGER_REGEX,
  OPTIONAL_NUMBER_REGEX,
  OPTIONAL_STRING,
} from "@/lib/utils/validators";
import {
  createEmissionLimit,
  editEmissionLimit,
} from "@/services/emission-limits";
import { createLimitHistory, editLimitHistory } from "@/services/limit-history";
import { useAuthStore } from "@/store/useAuthStore";
import { EmissionLimits } from "@/types/emission-limits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const validateGasLimit = (
  setLimit: boolean | undefined,
  limit: string | undefined
) => {
  return !setLimit || limit !== undefined;
};

const formSchema = z
  .object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    description: OPTIONAL_STRING,
    setpm10limit: OPTIONAL_BOOLEAN,
    pm10limit: OPTIONAL_NUMBER_REGEX,
    setpm25limit: OPTIONAL_BOOLEAN,
    pm25limit: OPTIONAL_NUMBER_REGEX,
    setso2limit: OPTIONAL_BOOLEAN,
    so2limit: OPTIONAL_NUMBER_REGEX,
    setno2limit: OPTIONAL_BOOLEAN,
    no2limit: OPTIONAL_NUMBER_REGEX,
    setcolimit: OPTIONAL_BOOLEAN,
    colimit: OPTIONAL_NUMBER_REGEX,
    is_active: OPTIONAL_BOOLEAN,
    is_public: OPTIONAL_BOOLEAN,
    email_alert: OPTIONAL_BOOLEAN,
    app_alert: OPTIONAL_BOOLEAN,
    gap_time: OPTIONAL_INTEGER_REGEX,
  })
  .refine(
    (data) =>
      validateGasLimit(data.setpm10limit, data.pm10limit) &&
      validateGasLimit(data.setpm25limit, data.pm25limit) &&
      validateGasLimit(data.setso2limit, data.so2limit) &&
      validateGasLimit(data.setno2limit, data.no2limit) &&
      validateGasLimit(data.setcolimit, data.colimit),
    {
      message:
        "Debe definir el límite de gas si la opción correspondiente está activada",
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
      path: [
        "setpm10limit",
        "setpm25limit",
        "setso2limit",
        "setno2limit",
        "setcolimit",
      ],
    }
  );

export type EmissionsLimitAddFormValues = z.infer<typeof formSchema>;

const formDefaultValues: EmissionsLimitAddFormValues = {
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
  gap_time: undefined,
  is_public: false,
  is_active: true,
};

interface Props {
  initialData?: EmissionLimits;
}

export default function useEmissionsLimitAddForm({ initialData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { toast } = useToast();
  const { user, isBrickyard, isInstitution } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
    isInstitution: state.isInstitution,
  }));

  const form = useForm<EmissionsLimitAddFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
    reValidateMode: "onChange",
  });

  const findLimit = (gasType: number, arrayData: EmissionLimits) =>
    arrayData.limit_history.find((limit) => limit.gas_type === gasType);

  function handleOnSubmitHistoryLimit(
    id: number,
    gasTypeId: number,
    limit: number,
    method: "create" | "edit" = "create"
  ) {
    if (method === "edit") {
      editLimitHistory(
        {
          max_limit: limit,
          is_modified: false,
          start_date: new Date(),
        },
        id
      ).catch(() => {
        toast({
          variant: "destructive",
          title: DEFAULT_ERROR.header,
          description: `No se pudo ${
            method === "edit" ? "editar" : "crear"
          } el límite de emisiones`,
        });

        push("/limite-emisiones");
      });
    } else {
      createLimitHistory({
        emission_limit: id,
        gas_type: gasTypeId,
        max_limit: limit,
        is_modified: false,
        start_date: new Date(),
      }).catch(() => {
        toast({
          variant: "destructive",
          title: DEFAULT_ERROR.header,
          description: `No se pudo crear el límite de emisiones`,
        });

        push("/limite-emisiones");
      });
    }
  }

  function onSubmit(values: EmissionsLimitAddFormValues) {
    setIsLoading(true);
    // Edit mode
    if (initialData) {
      console.log(initialData);

      editEmissionLimit(
        {
          name: values.name,
          description: values.description,
          email_alert: values.email_alert,
          app_alert: values.app_alert,
          is_public: values.is_public,
          is_active: values.is_active,
          ...(values.gap_time && { gap_time: Number(values.gap_time) }),
          ...(isBrickyard && { brickyard: user?.brickyard?.id }),
          ...(isInstitution && {
            institution: user?.institution?.id,
          }),
        },
        initialData.id
      )
        .then((response) => {
          if (values.setpm10limit) {
            handleOnSubmitHistoryLimit(
              findLimit(PM10, initialData)?.id || initialData.id,
              PM10,
              Number(values.pm10limit),
              "edit"
            );
          }
          if (values.setpm25limit) {
            handleOnSubmitHistoryLimit(
              findLimit(PM25, initialData)?.id || initialData.id,
              PM25,
              Number(values.pm25limit),
              "edit"
            );
          }
          if (values.setso2limit) {
            handleOnSubmitHistoryLimit(
              findLimit(SO2, initialData)?.id || initialData.id,
              SO2,
              Number(values.so2limit),
              "edit"
            );
          }
          if (values.setno2limit) {
            handleOnSubmitHistoryLimit(
              findLimit(NO2, initialData)?.id || initialData.id,
              NO2,
              Number(values.no2limit),
              "edit"
            );
          }
          if (values.setcolimit) {
            handleOnSubmitHistoryLimit(
              findLimit(CO, initialData)?.id || initialData.id,
              CO,
              Number(values.colimit),
              "edit"
            );
          }

          toast({
            description: "Límite de emisiones actualizado con éxito",
          });

          push("/limite-emisiones");
        })
        .catch((e) => {
          const error = getError(
            e,
            "No se pudo actualizar el límite de emisiones"
          );

          toast({
            variant: "destructive",
            title: DEFAULT_ERROR.header,
            description: error.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createEmissionLimit({
        name: values.name,
        description: values.description,
        email_alert: values.email_alert,
        app_alert: values.app_alert,
        is_public: values.is_public,
        is_active: values.is_active,
        gap_time: values.gap_time,
        ...(isBrickyard && { brickyard: user?.brickyard?.id }),
        ...(isInstitution && {
          institution: user?.institution?.id,
        }),
      })
        .then((response) => {
          if (values.setpm10limit) {
            handleOnSubmitHistoryLimit(
              response.id,
              PM10,
              Number(values.pm10limit)
            );
          }
          if (values.setpm25limit) {
            handleOnSubmitHistoryLimit(
              response.id,
              PM25,
              Number(values.pm25limit)
            );
          }
          if (values.setso2limit) {
            handleOnSubmitHistoryLimit(
              response.id,
              SO2,
              Number(values.so2limit)
            );
          }
          if (values.setno2limit) {
            handleOnSubmitHistoryLimit(
              response.id,
              NO2,
              Number(values.no2limit)
            );
          }
          if (values.setcolimit) {
            handleOnSubmitHistoryLimit(response.id, CO, Number(values.colimit));
          }

          toast({
            description: "Límite de emisiones creado con éxito",
          });

          push("/limite-emisiones");
        })
        .catch((e) => {
          const error = getError(e, "No se pudo crear el límite de emisiones");

          toast({
            variant: "destructive",
            title: DEFAULT_ERROR.header,
            description: error.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (!initialData) return;

    const co = findLimit(CO, initialData);
    const no2 = findLimit(NO2, initialData);
    const so2 = findLimit(SO2, initialData);
    const pm25 = findLimit(PM25, initialData);
    const pm10 = findLimit(PM10, initialData);

    form.reset({
      name: initialData.name,
      description: initialData.description,
      setpm10limit: !!pm10,
      pm10limit: pm10?.max_limit
        ? String(pm10?.max_limit)
        : formDefaultValues.pm10limit,
      setpm25limit: !!pm25,
      pm25limit: pm25?.max_limit
        ? String(pm25?.max_limit)
        : formDefaultValues.pm25limit,
      setso2limit: !!so2,
      so2limit: so2?.max_limit
        ? String(so2?.max_limit)
        : formDefaultValues.so2limit,
      setno2limit: !!no2,
      no2limit: no2?.max_limit
        ? String(no2?.max_limit)
        : formDefaultValues.no2limit,
      setcolimit: !!co,
      colimit: co?.max_limit
        ? String(co?.max_limit)
        : formDefaultValues.colimit,
      email_alert: initialData.email_alert,
      app_alert: initialData.app_alert,
      gap_time: initialData.gap_time ? String(initialData.gap_time) : undefined,
      is_public: initialData.is_public,
      is_active: initialData.is_active,
    });
  }, [initialData, form]);

  return {
    form,
    isLoading,
    onSubmit,
  };
}
