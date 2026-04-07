export type CaliberCategory = "blanco" | "color";
export interface CaliberDefinition {
    id: string;
    name: string;
    shortName: string;
    category: CaliberCategory;
    defaultUnitsPerBox: number;
}
export declare const CALIBERS: CaliberDefinition[];
export declare const CALIBERS_BY_ID: {
    [k: string]: CaliberDefinition;
};
