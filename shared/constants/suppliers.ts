export interface PredefinedSupplier {
  id: string;
  name: string;
  type: "predefined" | "other";
}

export const PREDEFINED_SUPPLIERS: PredefinedSupplier[] = [
  { id: "comercial-sin-frontera", name: "Comercial Sin Frontera", type: "predefined" },
  { id: "comercial-santa-minerva", name: "Comercial Santa Minerva", type: "predefined" },
  { id: "toledo", name: "Toledo", type: "predefined" },
  { id: "nelson", name: "Nelson", type: "predefined" },
  { id: "otro", name: "Otro", type: "other" }
];
