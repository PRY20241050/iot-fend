"use client";

import {
  Form,
  FormCheckboxInput,
  FormInput,
  FormSwitch,
  FormTextArea,
  FormButton,
} from "@/components/ui/form";
import useEmissionsLimitAddForm from "./useEmissionsLimitAddForm";
import {
  TypographyH4,
  TypographyP,
  TypographySmall,
} from "@/components/ui/typography";

import s from "./EmissionsLimitAdd.module.scss";
import { cn, LIMITE_EMISIONES_PATH } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EmissionLimits } from "@/types/emission-limits";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  initialData?: EmissionLimits;
}

export default function EmissionsLimitAddForm({ initialData }: Props) {
  const { form, isLoading, onSubmit } = useEmissionsLimitAddForm({
    initialData,
  });
  const { isBrickyard } = useAuthStore((state) => ({
    isBrickyard: state.isBrickyard,
  }));

  const { push } = useRouter();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="tablet-lg:grid tablet-lg:grid-cols-2 tablet-lg:gap-x-10">
          <div>
            <FormInput
              form={form}
              name="name"
              label="Nombre (*)"
              placeholder="Ejm: Trabajadores de la ladrillera"
              description='Proporciona un nombre del propósito de este nuevo límite.
                Ejemplo: "Trabajadores de la ladrillera" o "Horno
                de ladrillos"'
            />
            <div className="pt-4">
              <FormTextArea
                form={form}
                name="description"
                label="Descripción"
                description="Dinos la razón por la que se está creando este límite"
              />
            </div>
            <div className="pt-5">
              <TypographyH4>Gases monitoreados</TypographyH4>
              <TypographyP
                className={cn(s["form-subtitle"], "text-muted-foreground")}
              >
                Seleccione los gases que desea monitorear y establecer límites.
                <br />
                <TypographySmall>
                  Al menos debe seleccionar uno. (*)
                </TypographySmall>
              </TypographyP>
            </div>
            <FormCheckboxInput
              form={form}
              checkboxName="setpm10limit"
              checkboxLabel="Material particulado (PM10)"
              inputName="pm10limit"
              inputLabel="Concentración (mg/m3)"
              inputType="number"
              inputPlaceholder="Ejm: 125.0"
            />
            <FormCheckboxInput
              form={form}
              checkboxName="setpm25limit"
              checkboxLabel="Material particulado (PM2.5)"
              inputName="pm25limit"
              inputLabel="Concentración (mg/m3)"
              inputType="number"
              inputPlaceholder="Ejm: 50.0"
            />
            <FormCheckboxInput
              form={form}
              checkboxName="setso2limit"
              checkboxLabel="Dióxido de azufre (SO2)"
              inputName="so2limit"
              inputLabel="Concentración (mg/m3)"
              inputType="number"
              inputPlaceholder="Ejm: 75.0"
            />
            <FormCheckboxInput
              form={form}
              checkboxName="setno2limit"
              checkboxLabel="Dióxido de nitrógeno (NO2)"
              inputName="no2limit"
              inputLabel="Concentración (mg/m3)"
              inputType="number"
              inputPlaceholder="Ejm: 25.0"
            />
            <FormCheckboxInput
              form={form}
              checkboxName="setcolimit"
              checkboxLabel="Monóxido de carbono (CO)"
              inputName="colimit"
              inputLabel="Concentración (mg/m3)"
              inputType="number"
              inputPlaceholder="Ejm: 400.0"
            />
          </div>
          <div>
            <div className="pt-7">
              <TypographyH4>Estado</TypographyH4>
            </div>
            <FormSwitch
              form={form}
              name="is_active"
              label="Está activo"
              description="Activa o desactiva este límite de emisiones"
            />
            <FormSwitch
              form={form}
              name="is_public"
              label="Es público"
              description={`Si está activo, este límite será visible para ${
                isBrickyard
                  ? "las instituciones que administran esta ladrillera"
                  : "las ladrilleras que administra esta institución"
              }`}
            />
            <div className="pt-7">
              <TypographyH4>Alertas</TypographyH4>
              <TypographyP
                className={cn(s["form-subtitle"], "text-muted-foreground")}
              >
                Le notificaremos cuando se exceda el límite establecido para
                cualquiera de los gases monitoreados
              </TypographyP>
            </div>
            <FormSwitch
              form={form}
              name="email_alert"
              label="Correo electrónico"
              description="Le notificaremos al correo electrónico registrado"
            />
            <FormSwitch
              form={form}
              name="app_alert"
              label="En aplicación"
              description="Le notificaremos a través de la aplicación"
            />
            <FormInput
              form={form}
              name="gap_time"
              label="Tiempo requerido antes de la alerta"
              type="number"
              placeholder="Ejm: 100"
              description="Este es el tiempo en segundos que debe pasar antes de enviarse una nueva alerta por exceder un LMP.
              Por defecto, una alerta se genera por cada vez que se sobrepasa un LMP, esta opción limita esto."
              className="mt-5"
            />
          </div>
        </div>
        <div className="pt-9 flex flex-col-reverse gap-3 phone-lg:flex-row phone-lg:justify-end">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              push(LIMITE_EMISIONES_PATH);
            }}
          >
            Volver
          </Button>
          <FormButton
            isLoading={isLoading}
            disabled={isLoading || !form.formState.isValid}
            text="Guardar"
          />
        </div>
      </form>
    </Form>
  );
}
