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
import { usePathname } from "next/navigation";
import { GASES, SCALES } from "@/mocks/filter";

interface Props {
  isGauge?: boolean;
}

export default function FilterForm({ isGauge = false }: Props) {
  const pathname = usePathname();
  const isHistory = pathname === "/historial";

  const {
    form,
    onSubmit,
    resetForm,
    devices,
    devicesIsLoading,
    emissionLimits,
    limitsIsLoading,
  } = useFilterForm();

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
          {(isGauge || isHistory) && (
            <>
              <FormSelect
                form={form}
                name="device"
                label="Por dispositivo"
                placeholder="Seleccionar dispositivo"
                selectLabel="Dispositivos"
                options={devices}
                disabled={devicesIsLoading}
              />
              <FormSelect
                form={form}
                name="emissionLimit"
                label="Comparar con límite de emisión"
                placeholder="Seleccionar límite de emisión"
                selectLabel="Límites de emisión"
                options={emissionLimits}
                disabled={limitsIsLoading}
              />
            </>
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
            className="w-full"
          />
          <Button
            variant="secondary"
            className="w-full"
            type="button"
            onClick={() => resetForm()}
          >
            Reiniciar filtros
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
