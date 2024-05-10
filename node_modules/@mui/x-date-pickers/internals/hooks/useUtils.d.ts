import { MuiPickersAdapterContextValue } from '../../LocalizationProvider/LocalizationProvider';
import { PickersLocaleText } from '../../locales/utils/pickersLocaleTextApi';
import { PickersTimezone, PickerValidDate } from '../../models';
export declare const useLocalizationContext: <TDate extends PickerValidDate>() => Omit<MuiPickersAdapterContextValue<TDate>, "localeText"> & {
    localeText: PickersLocaleText<TDate>;
};
export declare const useUtils: <TDate extends PickerValidDate>() => import("@mui/x-date-pickers/models").MuiPickersAdapter<TDate, any>;
export declare const useDefaultDates: <TDate extends PickerValidDate>() => {
    minDate: TDate;
    maxDate: TDate;
};
export declare const useLocaleText: <TDate extends PickerValidDate>() => PickersLocaleText<TDate>;
export declare const useNow: <TDate extends PickerValidDate>(timezone: PickersTimezone) => TDate;
