export interface AccordionDetailsClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type AccordionDetailsClassKey = keyof AccordionDetailsClasses;
export declare function getAccordionDetailsUtilityClass(slot: string): string;
declare const accordionDetailsClasses: AccordionDetailsClasses;
export default accordionDetailsClasses;
