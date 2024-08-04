import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormButton,
  FormSelect,
  FormDatePicker,
} from "@/components/ui/form";
import useFilterForm from "./useFilterForm";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRequest } from "@/lib/api/swr";
import { useAuthStore } from "@/store/useAuthStore";
import { Device } from "@/types/device";
import { DEVICES_URL } from "@/services/consts";
import { usePathname } from "next/navigation";
import { GASES, SCALES } from "@/mocks/filter";

interface Props {
  isGauge: boolean;
}

export default function FilterForm({ isGauge }: Props) {
  const pathname = usePathname();

  const { form, onSubmit, resetForm } = useFilterForm();

  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const { data, isLoading } = useRequest<Device[]>({
    url: user?.brickyard?.id ? DEVICES_URL : "",
    params: {
      brickyard_id: user?.brickyard?.id,
    },
  });

  const devices = data?.map((device) => ({
    value: device.id.toString(),
    label: device.name,
  }));

  const isDashboard = pathname === "/dashboard";

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
                options={SCALES}
              />
            </>
          )}
          {(isGauge || !isDashboard) && (
            <FormSelect
              form={form}
              name="device"
              label="Por dispositivo"
              placeholder="Seleccionar dispositivo"
              selectLabel="Dispositivos"
              options={devices}
              disabled={isLoading}
            />
          )}
          {!isGauge && (
            <FormField
              control={form.control}
              name="gases"
              render={() => (
                <FormItem>
                  <FormLabel>Por gas</FormLabel>
                  {GASES.map((gas) => (
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
            type="submit"
            className="w-full"
          />
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => resetForm()}
          >
            Reiniciar filtros
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
