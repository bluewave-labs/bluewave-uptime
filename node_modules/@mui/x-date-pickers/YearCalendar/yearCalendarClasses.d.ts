export interface YearCalendarClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type YearCalendarClassKey = keyof YearCalendarClasses;
export declare function getYearCalendarUtilityClass(slot: string): string;
export declare const yearCalendarClasses: Record<"root", string>;
