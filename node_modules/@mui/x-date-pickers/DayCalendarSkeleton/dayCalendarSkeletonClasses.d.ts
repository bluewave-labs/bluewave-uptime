export interface DayCalendarSkeletonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the week element. */
    week: string;
    /** Styles applied to the day element. */
    daySkeleton: string;
}
export type DayCalendarSkeletonClassKey = keyof DayCalendarSkeletonClasses;
export declare const getDayCalendarSkeletonUtilityClass: (slot: string) => string;
export declare const dayCalendarSkeletonClasses: DayCalendarSkeletonClasses;
