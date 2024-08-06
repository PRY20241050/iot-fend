import { useRequest } from "@/lib/api/swr";
import { OPTIONAL_STRING } from "@/lib/utils/validators";
import { DEVICES_URL, EMISSION_LIMITS_URL } from "@/services/consts";
import { useAuthStore } from "@/store/useAuthStore";
import { FilterStoreValues, useFilterStore } from "@/store/useFilterStore";
import { Device } from "@/types/device";
import { EmissionsLimit } from "@/types/emissions-limit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FilterFormValues = FilterStoreValues;

const formSchema = z
  .object({
    dateFrom: z.date({ message: "Fecha inválida" }).optional(),
    dateTo: z.date({ message: "Fecha inválida" }).optional(),
    scale: OPTIONAL_STRING,
    device: OPTIONAL_STRING,
    emissionLimit: OPTIONAL_STRING,
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

const formDefaultValues: FilterFormValues = {
  dateFrom: undefined,
  dateTo: undefined,
  scale: "",
  device: undefined,
  emissionLimit: undefined,
  gases: [],
};

export default function useFilterForm() {
  const { setFilter } = useFilterStore((state) => ({
    setFilter: state.setFilter,
  }));

  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));

  // Fetch devices
  const { data: deviceData, isLoading: devicesIsLoading } = useRequest<
    Device[]
  >(
    user?.brickyard?.id
      ? {
          url: DEVICES_URL,
          params: {
            brickyard_id: user?.brickyard?.id,
          },
        }
      : null
  );

  // Fetch limits
  const { data: limitsData, isLoading: limitsIsLoading } = useRequest<
    EmissionsLimit[]
  >(
    user
      ? {
          url: EMISSION_LIMITS_URL,
          params: {
            ...(isBrickyard && {
              brickyard_id: user.brickyard?.id,
              show_institution: true,
              is_public: true,
            }),
          },
        }
      : null
  );

  const devices = deviceData?.map((device) => ({
    value: device.id.toString(),
    label: device.name,
  }));

  const emissionLimits = limitsData?.map((limit) => ({
    value: limit.id.toString(),
    label: limit.name,
  }));

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
    reValidateMode: "onChange",
  });

  const resetForm = () => {
    form.reset(formDefaultValues);
  };

  const onSubmit = (values: FilterFormValues) => {
    setFilter(values);
  };

  return {
    form,
    onSubmit,
    resetForm,
    devices,
    devicesIsLoading,
    emissionLimits,
    limitsIsLoading,
  };
}
