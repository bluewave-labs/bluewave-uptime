import type { PickerValueManager } from './usePicker';
import { PickersTimezone, PickerValidDate } from '../../models';
/**
 * Hooks making sure that:
 * - The value returned by `onChange` always have the timezone of `props.value` or `props.defaultValue` if defined
 * - The value rendered is always the one from `props.timezone` if defined
 */
export declare const useValueWithTimezone: <TDate extends PickerValidDate, TValue, TChange extends (...params: any[]) => void>({ timezone: timezoneProp, value: valueProp, defaultValue, onChange, valueManager, }: {
    timezone: PickersTimezone | undefined;
    value: TValue | undefined;
    defaultValue: TValue | undefined;
    onChange: TChange | undefined;
    valueManager: PickerValueManager<TValue, TDate, any>;
}) => {
    value: TValue;
    handleValueChange: TChange;
    timezone: string;
};
/**
 * Wrapper around `useControlled` and `useValueWithTimezone`
 */
export declare const useControlledValueWithTimezone: <TDate extends PickerValidDate, TValue, TChange extends (...params: any[]) => void>({ name, timezone: timezoneProp, value: valueProp, defaultValue, onChange: onChangeProp, valueManager, }: {
    name: string;
    timezone: PickersTimezone | undefined;
    value: TValue | undefined;
    defaultValue: TValue | undefined;
    onChange: TChange | undefined;
    valueManager: PickerValueManager<TValue, TDate, any>;
}) => {
    value: TValue;
    handleValueChange: TChange;
    timezone: string;
};
