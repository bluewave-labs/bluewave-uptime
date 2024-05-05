export interface CardClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type CardClassKey = keyof CardClasses;
export declare function getCardUtilityClass(slot: string): string;
declare const cardClasses: CardClasses;
export default cardClasses;
