import { useEffect, useMemo, useState } from "react";
import type { PurchaseHeaderDraft } from "@shared/types/purchase";
import type { PickupLocation } from "@shared/types/supplier";
import { DateField } from "@/components/ui/DateField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

const PERSON_OPTIONS = ["Luis Maldonado", "Dayan Raffernau"] as const;
const PAYMENT_OPTIONS = ["Efectivo", "Transferencia"] as const;

export type PurchaseDetailsField =
  | "documentNumber"
  | "purchaseDate"
  | "responsibleName"
  | "authorizerName"
  | "deliveryMode"
  | "pickupLocationId"
  | "pickupLocationLabel"
  | "addressText"
  | "paymentMethod"
  | "notes";

type PurchaseDetailsValue = Pick<
  PurchaseHeaderDraft,
  | "documentNumber"
  | "purchaseDate"
  | "responsibleName"
  | "authorizerName"
  | "deliveryMode"
  | "addressText"
  | "paymentMethod"
  | "notes"
>;

type PersonSelectMode = "" | (typeof PERSON_OPTIONS)[number] | "Otro";
type PaymentSelectMode = "" | (typeof PAYMENT_OPTIONS)[number] | "Otro";

interface PurchaseDetailsFormProps {
  value: PurchaseDetailsValue;
  pickupLocations: PickupLocation[];
  onChange: (field: PurchaseDetailsField, value: string) => void;
}

function personSelectValue(value: string): PersonSelectMode {
  if (!value) return "";
  return PERSON_OPTIONS.includes(value as (typeof PERSON_OPTIONS)[number]) ? (value as (typeof PERSON_OPTIONS)[number]) : "Otro";
}

function paymentSelectValue(value: string): PaymentSelectMode {
  if (!value) return "";
  return PAYMENT_OPTIONS.includes(value as (typeof PAYMENT_OPTIONS)[number]) ? (value as (typeof PAYMENT_OPTIONS)[number]) : "Otro";
}

export function PurchaseDetailsForm({ value, pickupLocations, onChange }: PurchaseDetailsFormProps) {
  const [responsibleMode, setResponsibleMode] = useState<PersonSelectMode>(personSelectValue(value.responsibleName));
  const [authorizerMode, setAuthorizerMode] = useState<PersonSelectMode>(personSelectValue(value.authorizerName));
  const [paymentMode, setPaymentMode] = useState<PaymentSelectMode>(paymentSelectValue(value.paymentMethod));

  const responsibleIsOther = useMemo(() => responsibleMode === "Otro", [responsibleMode]);
  const authorizerIsOther = useMemo(() => authorizerMode === "Otro", [authorizerMode]);
  const paymentIsOther = useMemo(() => paymentMode === "Otro", [paymentMode]);

  useEffect(() => {
    if (value.responsibleName) {
      setResponsibleMode(personSelectValue(value.responsibleName));
      return;
    }
    if (!responsibleIsOther) {
      setResponsibleMode("");
    }
  }, [responsibleIsOther, value.responsibleName]);

  useEffect(() => {
    if (value.authorizerName) {
      setAuthorizerMode(personSelectValue(value.authorizerName));
      return;
    }
    if (!authorizerIsOther) {
      setAuthorizerMode("");
    }
  }, [authorizerIsOther, value.authorizerName]);

  useEffect(() => {
    if (value.paymentMethod) {
      setPaymentMode(paymentSelectValue(value.paymentMethod));
      return;
    }
    if (!paymentIsOther) {
      setPaymentMode("");
    }
  }, [paymentIsOther, value.paymentMethod]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Input value={value.documentNumber} onChange={(event) => onChange("documentNumber", event.target.value)} placeholder="N° documento" />
      <DateField value={value.purchaseDate} onChange={(event) => onChange("purchaseDate", event.target.value)} />

      <div className="space-y-2">
        <Select
          value={responsibleMode}
          onChange={(event) => {
            const nextMode = event.target.value as PersonSelectMode;
            setResponsibleMode(nextMode);
            onChange("responsibleName", nextMode === "Otro" ? "" : nextMode);
          }}
        >
          <option value="">Selecciona responsable</option>
          {PERSON_OPTIONS.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
          <option value="Otro">Otro</option>
        </Select>
        {responsibleIsOther ? (
          <Input value={value.responsibleName} onChange={(event) => onChange("responsibleName", event.target.value)} placeholder="Escribe el responsable" />
        ) : null}
      </div>

      <div className="space-y-2">
        <Select
          value={authorizerMode}
          onChange={(event) => {
            const nextMode = event.target.value as PersonSelectMode;
            setAuthorizerMode(nextMode);
            onChange("authorizerName", nextMode === "Otro" ? "" : nextMode);
          }}
        >
          <option value="">Selecciona quién autoriza</option>
          {PERSON_OPTIONS.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
          <option value="Otro">Otro</option>
        </Select>
        {authorizerIsOther ? (
          <Input value={value.authorizerName} onChange={(event) => onChange("authorizerName", event.target.value)} placeholder="Escribe quién autoriza" />
        ) : null}
      </div>

      <Select value={value.deliveryMode} onChange={(event) => onChange("deliveryMode", event.target.value)}>
        <option value="retiro">Retiro</option>
        <option value="despacho">Despacho</option>
      </Select>

      <div className="space-y-2">
        <Select
          value={paymentMode}
          onChange={(event) => {
            const nextMode = event.target.value as PaymentSelectMode;
            setPaymentMode(nextMode);
            onChange("paymentMethod", nextMode === "Otro" ? "" : nextMode);
          }}
        >
          <option value="">Selecciona forma de pago</option>
          {PAYMENT_OPTIONS.map((paymentOption) => (
            <option key={paymentOption} value={paymentOption}>
              {paymentOption}
            </option>
          ))}
          <option value="Otro">Otro</option>
        </Select>
        {paymentIsOther ? (
          <Input value={value.paymentMethod} onChange={(event) => onChange("paymentMethod", event.target.value)} placeholder="Escribe la forma de pago" />
        ) : null}
      </div>

      <Select
        value={value.addressText}
        onChange={(event) => {
          const selectedLocation = pickupLocations.find((location) => location.addressLine === event.target.value);
          onChange("addressText", event.target.value);
          onChange("pickupLocationId", selectedLocation?.id || "");
          onChange("pickupLocationLabel", selectedLocation?.label || "");
        }}
        className={value.deliveryMode === "retiro" && pickupLocations.length ? "" : "hidden"}
      >
        <option value="">Selecciona una dirección predefinida</option>
        {pickupLocations.map((location) => (
          <option key={location.id} value={location.addressLine}>
            {location.label}
          </option>
        ))}
      </Select>
      <div className="md:col-span-2">
        <Input value={value.addressText} onChange={(event) => onChange("addressText", event.target.value)} placeholder="Dirección o punto de retiro" />
      </div>

      <div className="md:col-span-2">
        <Textarea rows={4} value={value.notes} onChange={(event) => onChange("notes", event.target.value)} placeholder="Observaciones / notas" />
      </div>
    </div>
  );
}
