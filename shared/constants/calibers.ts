export type CaliberCategory = "blanco" | "color";

export interface CaliberDefinition {
  id: string;
  name: string;
  shortName: string;
  category: CaliberCategory;
  defaultUnitsPerBox: number;
}

export const CALIBERS: CaliberDefinition[] = [
  { id: "segunda-blanco", name: "Segunda Blanco", shortName: "2B", category: "blanco", defaultUnitsPerBox: 180 },
  { id: "primera-blanco", name: "Primera Blanco", shortName: "1B", category: "blanco", defaultUnitsPerBox: 180 },
  { id: "extra-blanco", name: "Extra Blanco", shortName: "EB", category: "blanco", defaultUnitsPerBox: 180 },
  { id: "super-blanco", name: "Súper Blanco", shortName: "SB", category: "blanco", defaultUnitsPerBox: 100 },
  { id: "jumbo-blanco", name: "Jumbo Blanco", shortName: "JB", category: "blanco", defaultUnitsPerBox: 100 },
  { id: "segunda-color", name: "Segunda Color", shortName: "2C", category: "color", defaultUnitsPerBox: 180 },
  { id: "primera-color", name: "Primera Color", shortName: "1C", category: "color", defaultUnitsPerBox: 180 },
  { id: "extra-color", name: "Extra Color", shortName: "EC", category: "color", defaultUnitsPerBox: 180 },
  { id: "super-color", name: "Súper Color", shortName: "SC", category: "color", defaultUnitsPerBox: 100 },
  { id: "jumbo-color", name: "Jumbo Color", shortName: "JC", category: "color", defaultUnitsPerBox: 100 }
];

export const CALIBERS_BY_ID = Object.fromEntries(CALIBERS.map((caliber) => [caliber.id, caliber]));
