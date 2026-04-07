import type { InputHTMLAttributes } from "react";
import { Input } from "./Input";

export function DateField(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input type="date" {...props} />;
}
