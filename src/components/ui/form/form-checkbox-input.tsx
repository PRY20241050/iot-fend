import { UseFormReturn } from "react-hook-form";
import { FormCheckbox } from "./form-checkbox";
import { FormInput } from "./form-input";
import { cn } from "@/lib/utils";

interface Props {
  form: UseFormReturn<any>;
  checkboxName: string;
  inputName: string;
  checkboxLabel: string;
  inputLabel: string;
  inputType?: string;
  inputPlaceholder?: string;
  className?: string;
}

export function FormCheckboxInput({
  form,
  checkboxName,
  inputName,
  checkboxLabel,
  inputLabel,
  inputType = "text",
  inputPlaceholder = "",
  className,
}: Props) {
  const inputIsDisabled = !form.getValues(checkboxName);

  return (
    <div className={cn("[&:not(:first-child)]:mt-6", className)}>
      <FormCheckbox form={form} name={checkboxName} label={checkboxLabel} />
      {!inputIsDisabled && (
        <div className="pt-2 lg:pt-3">
          <FormInput
            form={form}
            name={inputName}
            label={inputLabel}
            type={inputType}
            placeholder={inputPlaceholder}
            disabled={inputIsDisabled}
          />
        </div>
      )}
    </div>
  );
}
