import { useRequest } from "@/lib/api/swr";
import { OPTIONAL_STRING } from "@/lib/utils/validators";
import { DEVICES_URL, emissionLimitsByBrickyardIdUrl } from "@/services/consts";
import { useAuthStore } from "@/store/useAuthStore";
import { FilterStoreValues, useFilterStore } from "@/store/useFilterStore";
import { Device } from "@/types/device";
import { EmissionLimits } from "@/types/emission-limits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserTypeContext } from "../context/UserTypeContext";

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
  device: "",
  emissionLimit: "",
  gases: [],
};

export default function useFilterForm() {
  const { institution, brickyardId } = useUserTypeContext();
  const { getFilter, setFilter, resetFilter } = useFilterStore((state) => ({
    getFilter: state.getFilter,
    setFilter: state.setFilter,
    resetFilter: state.resetFilter,
  }));

  const { user, isAuthenticated } = useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));

  // Fetch devices
  const { data: deviceData, isLoading: devicesIsLoading } = useRequest<
    Device[]
  >(
    isAuthenticated
      ? {
          url: DEVICES_URL,
          params: {
            brickyard_id: institution ? brickyardId : user?.brickyard?.id,
          },
        }
      : null
  );

  // Fetch limits
  const { data: limitsData, isLoading: limitsIsLoading } = useRequest<
    EmissionLimits[]
  >(
    isAuthenticated
      ? {
          url: emissionLimitsByBrickyardIdUrl(
            institution ? brickyardId : user?.brickyard.id
          ),
          params: {
            ...(!institution && { is_public: true }),
            add_institution: true,
            add_management: true,
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
    form.reset({ ...formDefaultValues }, { keepValues: false });

    // Reset filter if form values are different
    if (JSON.stringify(getFilter()) !== JSON.stringify(form.getValues())) {
      resetFilter();
    }
  };

  const onSubmit = (values: FilterFormValues) => {
    // Update filter if form values are different
    if (JSON.stringify(getFilter()) === JSON.stringify(values)) return;
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
