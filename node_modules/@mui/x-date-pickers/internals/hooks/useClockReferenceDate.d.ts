import { MuiPickersAdapter, PickersTimezone, PickerValidDate } from '../../models';
export declare const useClockReferenceDate: <TDate extends PickerValidDate, TProps extends {}>({ value, referenceDate: referenceDateProp, utils, props, timezone, }: {
    value: TDate;
    referenceDate: TDate | undefined;
    utils: MuiPickersAdapter<TDate>;
    props: TProps;
    timezone: PickersTimezone;
}) => TDate;
