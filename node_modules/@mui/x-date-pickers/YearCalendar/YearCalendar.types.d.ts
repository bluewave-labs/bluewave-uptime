import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { YearCalendarClasses } from './yearCalendarClasses';
import { BaseDateValidationProps, YearValidationProps } from '../internals/models/validation';
import { PickerValidDate, TimezoneProps } from '../models';
export interface ExportedYearCalendarProps {
    /**
     * Years rendered per row.
     * @default 3
     */
    yearsPerRow?: 3 | 4;
}
export interface YearCalendarProps<TDate extends PickerValidDate> extends ExportedYearCalendarProps, YearValidationProps<TDate>, BaseDateValidationProps<TDate>, TimezoneProps {
    autoFocus?: boolean;
    className?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<YearCalendarClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /** If `true` picker is disabled */
    disabled?: boolean;
    /**
     * The selected value.
     * Used when the component is controlled.
     */
    value?: TDate | null;
    /**
     * The default selected value.
     * Used when the component is not controlled.
     */
    defaultValue?: TDate | null;
    /**
     * The date used to generate the new value when both `value` and `defaultValue` are empty.
     * @default The closest valid year using the validation props, except callbacks such as `shouldDisableYear`.
     */
    referenceDate?: TDate;
    /**
     * Callback fired when the value changes.
     * @template TDate
     * @param {TDate} value The new value.
     */
    onChange?: (value: TDate) => void;
    /** If `true` picker is readonly */
    readOnly?: boolean;
    /**
     * If `true`, today's date is rendering without highlighting with circle.
     * @default false
     */
    disableHighlightToday?: boolean;
    onYearFocus?: (year: number) => void;
    hasFocus?: boolean;
    onFocusedViewChange?: (hasFocus: boolean) => void;
    gridLabelId?: string;
}
