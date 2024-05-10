import { MuiPickersAdapter, PickerValidDate } from '../models';
import { MultiSectionDigitalClockOption } from './MultiSectionDigitalClock.types';
interface IGetHoursSectionOptions<TDate extends PickerValidDate> {
    now: TDate;
    value: TDate | null;
    utils: MuiPickersAdapter<TDate>;
    ampm: boolean;
    isDisabled: (value: number) => boolean;
    timeStep: number;
    resolveAriaLabel: (value: string) => string;
    valueOrReferenceDate: TDate;
}
export declare const getHourSectionOptions: <TDate extends PickerValidDate>({ now, value, utils, ampm, isDisabled, resolveAriaLabel, timeStep, valueOrReferenceDate, }: IGetHoursSectionOptions<TDate>) => MultiSectionDigitalClockOption<number>[];
interface IGetTimeSectionOptions<TDate extends PickerValidDate> {
    value: number | null;
    utils: MuiPickersAdapter<TDate>;
    isDisabled: (value: number) => boolean;
    timeStep: number;
    resolveLabel: (value: number) => string;
    hasValue?: boolean;
    resolveAriaLabel: (value: string) => string;
}
export declare const getTimeSectionOptions: <TDate extends PickerValidDate>({ value, utils, isDisabled, timeStep, resolveLabel, resolveAriaLabel, hasValue, }: IGetTimeSectionOptions<TDate>) => MultiSectionDigitalClockOption<number>[];
export {};
