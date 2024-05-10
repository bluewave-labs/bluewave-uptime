export interface PickersDayClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `disableMargin=false`. */
    dayWithMargin: string;
    /** Styles applied to the root element if `outsideCurrentMonth=true` and `showDaysOutsideCurrentMonth=true`. */
    dayOutsideMonth: string;
    /** Styles applied to the root element if `outsideCurrentMonth=true` and `showDaysOutsideCurrentMonth=false`. */
    hiddenDaySpacingFiller: string;
    /** Styles applied to the root element if `disableHighlightToday=false` and `today=true`. */
    today: string;
    /** State class applied to the root element if `selected=true`. */
    selected: string;
    /** State class applied to the root element if `disabled=true`. */
    disabled: string;
}
export type PickersDayClassKey = keyof PickersDayClasses;
export declare function getPickersDayUtilityClass(slot: string): string;
export declare const pickersDayClasses: Record<keyof PickersDayClasses, string>;
