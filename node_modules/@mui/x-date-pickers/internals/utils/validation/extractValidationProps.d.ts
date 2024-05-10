import { BaseDateValidationProps, BaseTimeValidationProps, DateTimeValidationProps, DayValidationProps, MonthValidationProps, TimeValidationProps, YearValidationProps } from '../../models/validation';
export declare const DATE_VALIDATION_PROP_NAMES: (keyof BaseDateValidationProps<any> | keyof YearValidationProps<any> | keyof MonthValidationProps<any> | keyof DayValidationProps<any>)[];
export declare const TIME_VALIDATION_PROP_NAMES: (keyof BaseTimeValidationProps | keyof TimeValidationProps<any> | 'ampm')[];
export declare const DATE_TIME_VALIDATION_PROP_NAMES: (keyof DateTimeValidationProps<any>)[];
/**
 * Extract the validation props for the props received by a component.
 * Limit the risk of forgetting some of them and reduce the bundle size.
 */
export declare const extractValidationProps: <Props extends {
    [key: string]: any;
}>(props: Props) => Pick<Props, "ampm" | "disableFuture" | "disablePast" | "maxDate" | "minDate" | "minutesStep" | "shouldDisableDate" | "shouldDisableMonth" | "shouldDisableYear" | "minTime" | "maxTime" | "shouldDisableTime" | "disableIgnoringDatePartForTimeValidation" | "minDateTime" | "maxDateTime">;
