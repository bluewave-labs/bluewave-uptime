export interface DateTimePickerToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the date container element. */
    dateContainer: string;
    /** Styles applied to the time container element. */
    timeContainer: string;
    /** Styles applied to the time (except am/pm) container element. */
    timeDigitsContainer: string;
    /** Styles applied to the time container if rtl. */
    timeLabelReverse: string;
    /** Styles applied to the separator element. */
    separator: string;
    /** Styles applied to the am/pm section. */
    ampmSelection: string;
    /** Styles applied to am/pm section in landscape mode. */
    ampmLandscape: string;
    /** Styles applied to am/pm labels. */
    ampmLabel: string;
}
export type DateTimePickerToolbarClassKey = keyof DateTimePickerToolbarClasses;
export declare function getDateTimePickerToolbarUtilityClass(slot: string): string;
export declare const dateTimePickerToolbarClasses: DateTimePickerToolbarClasses;
