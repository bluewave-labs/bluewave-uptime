import * as React from 'react';
import type { PickerSelectionState } from '../internals/hooks/usePicker';
import { useMeridiemMode } from '../internals/hooks/date-helpers-hooks';
import { PickerValidDate, TimeView } from '../models';
import { ClockClasses } from './clockClasses';
export interface ClockProps<TDate extends PickerValidDate> extends ReturnType<typeof useMeridiemMode> {
    ampm: boolean;
    ampmInClock: boolean;
    autoFocus?: boolean;
    children: readonly React.ReactNode[];
    isTimeDisabled: (timeValue: number, type: TimeView) => boolean;
    minutesStep?: number;
    onChange: (value: number, isFinish?: PickerSelectionState) => void;
    /**
     * DOM id that the selected option should have
     * Should only be `undefined` on the server
     */
    selectedId: string | undefined;
    type: TimeView;
    /**
     * The numeric value of the current view.
     */
    viewValue: number;
    /**
     * The current full date value.
     */
    value: TDate | null;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    classes?: Partial<ClockClasses>;
}
/**
 * @ignore - internal component.
 */
export declare function Clock<TDate extends PickerValidDate>(inProps: ClockProps<TDate>): React.JSX.Element;
