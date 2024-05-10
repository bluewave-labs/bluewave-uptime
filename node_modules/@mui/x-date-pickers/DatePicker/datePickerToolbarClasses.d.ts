export interface DatePickerToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the title element. */
    title: string;
}
export type DatePickerToolbarClassKey = keyof DatePickerToolbarClasses;
export declare function getDatePickerToolbarUtilityClass(slot: string): string;
export declare const datePickerToolbarClasses: DatePickerToolbarClasses;
