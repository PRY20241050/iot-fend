import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useFilterForm from "./useFilterForm";
import FormButton from "@/components/ui/form-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const options = [
  {
    value: "sensor1",
    label: "Sensor 1",
  },
  {
    value: "sensor2",
    label: "Sensor 2",
  },
  {
    value: "sensor3",
    label: "Sensor 3",
  },
];

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

export default function Filter() {
  const { form, onSubmit } = useFilterForm();

  return (
    <aside className="max-w-[35%] w-[270px]">
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 p-6">
              <FormField
                control={form.control}
                name="rangeDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Por rango de fechas</FormLabel>
                    <FormControl>
                        <DateRangePicker />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Por escala de tiempo</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Seleccionar escala"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Escalas</SelectLabel>
                            {scales.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sensor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Por sensor</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Seleccionar sensor"
                            {...field}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sensores</SelectLabel>
                            {options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
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
      </Card>
    </aside>
  );
}
