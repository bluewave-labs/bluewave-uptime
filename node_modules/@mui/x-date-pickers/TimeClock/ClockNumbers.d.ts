import * as React from 'react';
import { MuiPickersAdapter, PickerValidDate } from '../models';
import type { PickerSelectionState } from '../internals/hooks/usePicker';
interface GetHourNumbersOptions<TDate extends PickerValidDate> {
    ampm: boolean;
    value: TDate | null;
    getClockNumberText: (hour: string) => string;
    isDisabled: (value: number) => boolean;
    onChange: (value: number, isFinish?: PickerSelectionState) => void;
    /**
     * DOM id that the selected option should have
     * Should only be `undefined` on the server
     */
    selectedId: string | undefined;
    utils: MuiPickersAdapter<TDate>;
}
/**
 * @ignore - internal component.
 */
export declare const getHourNumbers: <TDate extends PickerValidDate>({ ampm, value, getClockNumberText, isDisabled, selectedId, utils, }: GetHourNumbersOptions<TDate>) => React.JSX.Element[];
export declare const getMinutesNumbers: <TDate extends PickerValidDate>({ utils, value, isDisabled, getClockNumberText, selectedId, }: Omit<GetHourNumbersOptions<TDate>, 'ampm' | 'value'> & {
    value: number;
}) => React.JSX.Element[];
export {};
