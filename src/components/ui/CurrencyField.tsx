import type { InputHTMLAttributes } from "react";
import { Input } from "./Input";

export function CurrencyField(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input inputMode="numeric" {...props} />;
}
