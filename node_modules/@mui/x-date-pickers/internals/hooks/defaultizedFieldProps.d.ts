import { BaseDateValidationProps, BaseTimeValidationProps, DateTimeValidationProps, TimeValidationProps } from '../models/validation';
import { DefaultizedProps } from '../models/helpers';
import { PickerValidDate } from '../../models';
export interface UseDefaultizedDateFieldBaseProps<TDate extends PickerValidDate> extends BaseDateValidationProps<TDate> {
    format?: string;
}
export declare const useDefaultizedDateField: <TDate extends PickerValidDate, TKnownProps extends UseDefaultizedDateFieldBaseProps<TDate>, TAllProps extends {}>(props: TKnownProps & TAllProps) => TAllProps & DefaultizedProps<TKnownProps, keyof UseDefaultizedDateFieldBaseProps<any>>;
export interface UseDefaultizedTimeFieldBaseProps extends BaseTimeValidationProps {
    format?: string;
}
export declare const useDefaultizedTimeField: <TDate extends PickerValidDate, TKnownProps extends UseDefaultizedTimeFieldBaseProps & {
    ampm?: boolean | undefined;
}, TAllProps extends {}>(props: TKnownProps & TAllProps) => TAllProps & DefaultizedProps<TKnownProps, keyof UseDefaultizedTimeFieldBaseProps>;
export interface UseDefaultizedDateTimeFieldBaseProps<TDate extends PickerValidDate> extends BaseDateValidationProps<TDate>, BaseTimeValidationProps {
    format?: string;
}
export declare const useDefaultizedDateTimeField: <TDate extends PickerValidDate, TKnownProps extends UseDefaultizedDateTimeFieldBaseProps<TDate> & DateTimeValidationProps<TDate> & TimeValidationProps<TDate> & {
    ampm?: boolean | undefined;
}, TAllProps extends {}>(props: TKnownProps & TAllProps) => TAllProps & DefaultizedProps<TKnownProps, keyof UseDefaultizedDateTimeFieldBaseProps<any>>;
