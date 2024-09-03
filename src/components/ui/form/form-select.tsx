import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { cn } from "@/lib/utils";

interface Props {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  selectLabel?: string;
  options?: { value: string; label: string; status?: boolean }[];
}

export function FormSelect({
  form,
  name,
  label,
  disabled = false,
  placeholder,
  selectLabel = undefined,
  options,
}: Props) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} {...field} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="relative">
                  {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
                  {options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className={cn(
                        {
                          "flex gap-2 before:block before:content-[''] before:w-3 before:h-3 before:rounded-full before:bg-status-deactivated/50":
                            option.status !== undefined,
                        },
                        { "before:bg-status-normal": option.status }
                      )}
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
  );
}
