import * as React from 'react';
import { AdapterFormats, MuiPickersAdapter, PickerValidDate } from '../models';
import { PickersInputLocaleText } from '../locales';
export interface MuiPickersAdapterContextValue<TDate extends PickerValidDate> {
    defaultDates: {
        minDate: TDate;
        maxDate: TDate;
    };
    utils: MuiPickersAdapter<TDate>;
    localeText: PickersInputLocaleText<TDate> | undefined;
}
export type MuiPickersAdapterContextNullableValue<TDate extends PickerValidDate> = {
    [K in keyof MuiPickersAdapterContextValue<TDate>]: MuiPickersAdapterContextValue<TDate>[K] | null;
};
export declare const MuiPickersAdapterContext: React.Context<MuiPickersAdapterContextNullableValue<any> | null>;
export interface LocalizationProviderProps<TDate extends PickerValidDate, TLocale> {
    children?: React.ReactNode;
    /**
     * Date library adapter class function.
     * @see See the localization provider {@link https://mui.com/x/react-date-pickers/getting-started/#setup-your-date-library-adapter date adapter setup section} for more details.
     */
    dateAdapter?: new (...args: any) => MuiPickersAdapter<TDate, TLocale>;
    /** Formats that are used for any child pickers */
    dateFormats?: Partial<AdapterFormats>;
    /**
     * Date library instance you are using, if it has some global overrides
     * ```jsx
     * dateLibInstance={momentTimeZone}
     * ```
     */
    dateLibInstance?: any;
    /**
     * Locale for the date library you are using
     */
    adapterLocale?: TLocale;
    /**
     * Locale for components texts
     */
    localeText?: PickersInputLocaleText<TDate>;
}
type LocalizationProviderComponent = (<TDate extends PickerValidDate, TLocale>(props: LocalizationProviderProps<TDate, TLocale>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [Date format and localization](https://mui.com/x/react-date-pickers/adapters-locale/)
 * - [Calendar systems](https://mui.com/x/react-date-pickers/calendar-systems/)
 * - [Translated components](https://mui.com/x/react-date-pickers/localization/)
 * - [UTC and timezones](https://mui.com/x/react-date-pickers/timezone/)
 *
 * API:
 *
 * - [LocalizationProvider API](https://mui.com/x/api/date-pickers/localization-provider/)
 */
export declare const LocalizationProvider: LocalizationProviderComponent;
export {};
