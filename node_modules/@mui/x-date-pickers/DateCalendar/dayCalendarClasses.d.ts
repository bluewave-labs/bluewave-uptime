export interface DayCalendarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the header element. */
    header: string;
    /** Styles applied to the week day label element. */
    weekDayLabel: string;
    /** Styles applied to the loading container element. */
    loadingContainer: string;
    /** Styles applied to the slide transition element. */
    slideTransition: string;
    /** Styles applied to the month container element. */
    monthContainer: string;
    /** Styles applied to the week container element. */
    weekContainer: string;
    /** Styles applied to the week number header */
    weekNumberLabel: string;
    /** Styles applied to the week number element */
    weekNumber: string;
}
export type DayCalendarClassKey = keyof DayCalendarClasses;
export declare const getDayCalendarUtilityClass: (slot: string) => string;
export declare const dayCalendarClasses: DayCalendarClasses;
