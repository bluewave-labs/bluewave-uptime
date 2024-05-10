import { AdapterFormats, AdapterOptions, DateBuilderReturnType, FieldFormatTokenMap, MuiPickersAdapter } from '../models';
import { MakeRequired } from '../internals/models/helpers';
type DateFnsLocaleBase = {
    formatLong?: {
        date?: any;
        time?: any;
        dateTime?: any;
    };
    code?: string;
};
type DateFnsAdapterBaseOptions<DateFnsLocale extends DateFnsLocaleBase> = MakeRequired<AdapterOptions<DateFnsLocale, never>, 'locale'> & {
    longFormatters: Record<'p' | 'P', (token: string, formatLong: any) => string>;
};
declare module '@mui/x-date-pickers/models' {
    interface PickerValidDateLookup {
        'date-fns': Date;
    }
}
/**
 * Based on `@date-io/date-fns`
 *
 * MIT License
 *
 * Copyright (c) 2017 Dmitriy Kovalenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
export declare class AdapterDateFnsBase<DateFnsLocale extends DateFnsLocaleBase> implements Pick<MuiPickersAdapter<Date, DateFnsLocale>, 'date' | 'getInvalidDate' | 'getTimezone' | 'setTimezone' | 'toJsDate' | 'getCurrentLocaleCode' | 'is12HourCycleInCurrentLocale' | 'expandFormat' | 'formatNumber'> {
    isMUIAdapter: boolean;
    isTimezoneCompatible: boolean;
    lib: string;
    locale: DateFnsLocale;
    formats: AdapterFormats;
    formatTokenMap: FieldFormatTokenMap;
    escapedCharacters: {
        start: string;
        end: string;
    };
    longFormatters: DateFnsAdapterBaseOptions<DateFnsLocale>['longFormatters'];
    constructor(props: DateFnsAdapterBaseOptions<DateFnsLocale>);
    date: <T extends string | null | undefined>(value?: T) => DateBuilderReturnType<T, Date>;
    getInvalidDate: () => Date;
    getTimezone: () => string;
    setTimezone: (value: Date) => Date;
    toJsDate: (value: Date) => Date;
    getCurrentLocaleCode: () => string;
    is12HourCycleInCurrentLocale: () => boolean;
    expandFormat: (format: string) => string;
    formatNumber: (numberToFormat: string) => string;
    getDayOfWeek: (value: Date) => number;
}
export {};
