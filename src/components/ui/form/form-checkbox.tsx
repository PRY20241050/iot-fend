import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "./form";

interface Props {
    form: UseFormReturn<any>;
    name: string;
    label: string;
}

export function FormCheckbox({ form, name, label }: Props) {
    return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{label}</FormLabel>
            </FormItem>
          )}
        />
    )
}
