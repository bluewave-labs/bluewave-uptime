export interface PickersCalendarHeaderClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the label container element. */
    labelContainer: string;
    /** Styles applied to the label element. */
    label: string;
    /** Styles applied to the switch view button element. */
    switchViewButton: string;
    /** Styles applied to the switch view icon element. */
    switchViewIcon: string;
}
export type PickersCalendarHeaderClassKey = keyof PickersCalendarHeaderClasses;
export declare const getPickersCalendarHeaderUtilityClass: (slot: string) => string;
export declare const pickersCalendarHeaderClasses: PickersCalendarHeaderClasses;
