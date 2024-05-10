export interface CardContentClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type CardContentClassKey = keyof CardContentClasses;
export declare function getCardContentUtilityClass(slot: string): string;
declare const cardContentClasses: CardContentClasses;
export default cardContentClasses;
