import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./form";
import { Switch } from "../switch";
import { cn } from "@/lib/utils";

interface Props {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description?: string;
  className?: string;
}

export function FormSwitch({
  form,
  name,
  label,
  description = "",
  className,
}: Props) {
  return (
    <div className={cn("[&:not(:first-child)]:mt-5", className)}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm gap-2">
            <div className="space-y-0.5">
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
