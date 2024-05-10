import { DateTime } from 'luxon';
import { AdapterFormats, AdapterOptions, DateBuilderReturnType, FieldFormatTokenMap, MuiPickersAdapter, PickersTimezone } from '../models';
declare module '@mui/x-date-pickers/models' {
    interface PickerValidDateLookup {
        luxon: DateTime;
    }
}
/**
 * Based on `@date-io/luxon`
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
export declare class AdapterLuxon implements MuiPickersAdapter<DateTime, string> {
    isMUIAdapter: boolean;
    isTimezoneCompatible: boolean;
    lib: string;
    locale: string;
    formats: AdapterFormats;
    escapedCharacters: {
        start: string;
        end: string;
    };
    formatTokenMap: FieldFormatTokenMap;
    constructor({ locale, formats }?: AdapterOptions<string, never>);
    private setLocaleToValue;
    date: <T extends string | null | undefined>(value?: T, timezone?: PickersTimezone) => DateBuilderReturnType<T, DateTime>;
    getInvalidDate: () => DateTime<true> | DateTime<false>;
    getTimezone: (value: DateTime) => string;
    setTimezone: (value: DateTime, timezone: PickersTimezone) => DateTime;
    toJsDate: (value: DateTime) => Date;
    parse: (value: string, formatString: string) => DateTime<true> | DateTime<false> | null;
    getCurrentLocaleCode: () => string;
    is12HourCycleInCurrentLocale: () => boolean;
    expandFormat: (format: string) => string;
    isValid: (value: DateTime | null) => boolean;
    format: (value: DateTime, formatKey: keyof AdapterFormats) => string;
    formatByString: (value: DateTime, format: string) => string;
    formatNumber: (numberToFormat: string) => string;
    isEqual: (value: DateTime | null, comparing: DateTime | null) => boolean;
    isSameYear: (value: DateTime, comparing: DateTime) => boolean;
    isSameMonth: (value: DateTime, comparing: DateTime) => boolean;
    isSameDay: (value: DateTime, comparing: DateTime) => boolean;
    isSameHour: (value: DateTime, comparing: DateTime) => boolean;
    isAfter: (value: DateTime, comparing: DateTime) => boolean;
    isAfterYear: (value: DateTime, comparing: DateTime) => boolean;
    isAfterDay: (value: DateTime, comparing: DateTime) => boolean;
    isBefore: (value: DateTime, comparing: DateTime) => boolean;
    isBeforeYear: (value: DateTime, comparing: DateTime) => boolean;
    isBeforeDay: (value: DateTime, comparing: DateTime) => boolean;
    isWithinRange: (value: DateTime, [start, end]: [DateTime, DateTime]) => boolean;
    startOfYear: (value: DateTime) => DateTime<boolean>;
    startOfMonth: (value: DateTime) => DateTime<boolean>;
    startOfWeek: (value: DateTime) => DateTime<boolean>;
    startOfDay: (value: DateTime) => DateTime<boolean>;
    endOfYear: (value: DateTime) => DateTime<boolean>;
    endOfMonth: (value: DateTime) => DateTime<boolean>;
    endOfWeek: (value: DateTime) => DateTime<boolean>;
    endOfDay: (value: DateTime) => DateTime<boolean>;
    addYears: (value: DateTime, amount: number) => DateTime<boolean>;
    addMonths: (value: DateTime, amount: number) => DateTime<boolean>;
    addWeeks: (value: DateTime, amount: number) => DateTime<boolean>;
    addDays: (value: DateTime, amount: number) => DateTime<boolean>;
    addHours: (value: DateTime, amount: number) => DateTime<boolean>;
    addMinutes: (value: DateTime, amount: number) => DateTime<boolean>;
    addSeconds: (value: DateTime, amount: number) => DateTime<boolean>;
    getYear: (value: DateTime) => number;
    getMonth: (value: DateTime) => number;
    getDate: (value: DateTime) => number;
    getHours: (value: DateTime) => number;
    getMinutes: (value: DateTime) => number;
    getSeconds: (value: DateTime) => number;
    getMilliseconds: (value: DateTime) => number;
    setYear: (value: DateTime, year: number) => DateTime<boolean>;
    setMonth: (value: DateTime, month: number) => DateTime<boolean>;
    setDate: (value: DateTime, date: number) => DateTime<boolean>;
    setHours: (value: DateTime, hours: number) => DateTime<boolean>;
    setMinutes: (value: DateTime, minutes: number) => DateTime<boolean>;
    setSeconds: (value: DateTime, seconds: number) => DateTime<boolean>;
    setMilliseconds: (value: DateTime, milliseconds: number) => DateTime<boolean>;
    getDaysInMonth: (value: DateTime) => import("luxon").PossibleDaysInMonth;
    getWeekArray: (value: DateTime) => DateTime<boolean>[][];
    getWeekNumber: (value: DateTime) => number;
    getDayOfWeek: (value: DateTime) => number;
    getYearRange: ([start, end]: [DateTime, DateTime]) => DateTime<boolean>[];
}
