import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormButton,
  FormSelect,
  FormDatePicker,
} from "@/components/ui/form";
import useFilterForm from "./useFilterForm";
import { CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { useRequest } from "@/lib/api/swr";
import { useAuthStore } from "@/store/useAuthStore";
import { Device } from "@/types/device";
import { DEVICES_URL } from "@/services/consts";

const scales = [
  {
    value: "day",
    label: "Día",
  },
  {
    value: "week",
    label: "Semana",
  },
  {
    value: "month",
    label: "Mes",
  },
  {
    value: "year",
    label: "Año",
  },
];

const gases = [
  {
    id: "SO2",
    label: "SO2",
  },
  {
    id: "NO2",
    label: "NO2",
  },
  {
    id: "CO",
    label: "CO",
  },
  {
    id: "PM10",
    label: "PM10",
  },
  {
    id: "PM2.5",
    label: "PM2.5",
  },
];

interface Props {
  isGauge: boolean;
}

export default function FilterForm({ isGauge }: Props) {
  const { form, onSubmit } = useFilterForm();

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const { data } = useRequest<Device[]>({
    url: user?.brickyard?.id ? DEVICES_URL : "",
    params: {
      brickyard_id: user?.brickyard?.id,
    },
  });

  const devices = data?.map((device) => ({
    value: device.id.toString(),
    label: device.name,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {!isGauge && (
            <>
              <FormDatePicker
                form={form}
                name="dateFrom"
                label="Rango de fechas"
                placeholder="Desde"
              />
              <FormDatePicker
                form={form}
                name="dateTo"
                placeholder="Hasta"
                compareDate={
                  form.getValues("dateFrom") ?? new Date("1900-01-01")
                }
              />
              <FormSelect
                form={form}
                name="scale"
                label="Por escala de tiempo"
                placeholder="Seleccionar escala"
                selectLabel="Escalas"
                options={scales}
              />
            </>
          )}
          {isGauge && (
            <FormSelect
              form={form}
              name="device"
              label="Por dispositivo"
              placeholder="Seleccionar dispositivo"
              selectLabel="Dispositivos"
              options={devices}
            />
          )}
          {!isGauge && (
            <FormField
              control={form.control}
              name="gases"
              render={() => (
                <FormItem>
                  <FormLabel>Por gas</FormLabel>
                  {gases.map((gas) => (
                    <FormField
                      key={gas.id}
                      control={form.control}
                      name="gases"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={gas.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(gas.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, gas.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== gas.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {gas.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <FormButton
            text="Aplicar filtro"
            disabled={false}
            isLoading={false}
            className="w-full"
          />
          <Button variant="secondary" className="w-full">
            Reiniciar filtros
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
