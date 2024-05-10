export interface DateCalendarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the transition group element. */
    viewTransitionContainer: string;
}
export type DateCalendarClassKey = keyof DateCalendarClasses;
export declare const getDateCalendarUtilityClass: (slot: string) => string;
export declare const dateCalendarClasses: DateCalendarClasses;
