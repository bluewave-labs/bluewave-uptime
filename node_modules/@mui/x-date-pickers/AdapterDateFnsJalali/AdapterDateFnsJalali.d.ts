/// <reference types="date-fns-jalali" />
import defaultLocale from 'date-fns-jalali/locale/fa-IR';
import { AdapterFormats, AdapterOptions, DateBuilderReturnType, FieldFormatTokenMap, MuiPickersAdapter } from '../models';
type DateFnsLocale = typeof defaultLocale;
declare module '@mui/x-date-pickers/models' {
    interface PickerValidDateLookup {
        'date-fns-jalali': Date;
    }
}
/**
 * Based on `@date-io/date-fns-jalali`
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
export declare class AdapterDateFnsJalali implements MuiPickersAdapter<Date, DateFnsLocale> {
    isMUIAdapter: boolean;
    isTimezoneCompatible: boolean;
    lib: string;
    locale?: DateFnsLocale;
    formats: AdapterFormats;
    formatTokenMap: FieldFormatTokenMap;
    escapedCharacters: {
        start: string;
        end: string;
    };
    constructor({ locale, formats }?: AdapterOptions<DateFnsLocale, never>);
    date: <T extends string | null | undefined>(value?: T) => DateBuilderReturnType<T, Date>;
    getInvalidDate: () => Date;
    getTimezone: () => string;
    setTimezone: (value: Date) => Date;
    toJsDate: (value: Date) => Date;
    parse: (value: string, format: string) => Date | null;
    getCurrentLocaleCode: () => string;
    is12HourCycleInCurrentLocale: () => boolean;
    expandFormat: (format: string) => string;
    isValid: (value: Date | null) => boolean;
    format: (value: Date, formatKey: keyof AdapterFormats) => string;
    formatByString: (value: Date, formatString: string) => string;
    formatNumber: (numberToFormat: string) => string;
    isEqual: (value: Date | null, comparing: Date | null) => boolean;
    isSameYear: (value: Date, comparing: Date) => boolean;
    isSameMonth: (value: Date, comparing: Date) => boolean;
    isSameDay: (value: Date, comparing: Date) => boolean;
    isSameHour: (value: Date, comparing: Date) => boolean;
    isAfter: (value: Date, comparing: Date) => boolean;
    isAfterYear: (value: Date, comparing: Date) => boolean;
    isAfterDay: (value: Date, comparing: Date) => boolean;
    isBefore: (value: Date, comparing: Date) => boolean;
    isBeforeYear: (value: Date, comparing: Date) => boolean;
    isBeforeDay: (value: Date, comparing: Date) => boolean;
    isWithinRange: (value: Date, [start, end]: [Date, Date]) => boolean;
    startOfYear: (value: Date) => Date;
    startOfMonth: (value: Date) => Date;
    startOfWeek: (value: Date) => Date;
    startOfDay: (value: Date) => Date;
    endOfYear: (value: Date) => Date;
    endOfMonth: (value: Date) => Date;
    endOfWeek: (value: Date) => Date;
    endOfDay: (value: Date) => Date;
    addYears: (value: Date, amount: number) => Date;
    addMonths: (value: Date, amount: number) => Date;
    addWeeks: (value: Date, amount: number) => Date;
    addDays: (value: Date, amount: number) => Date;
    addHours: (value: Date, amount: number) => Date;
    addMinutes: (value: Date, amount: number) => Date;
    addSeconds: (value: Date, amount: number) => Date;
    getYear: (value: Date) => number;
    getMonth: (value: Date) => number;
    getDate: (value: Date) => number;
    getHours: (value: Date) => number;
    getMinutes: (value: Date) => number;
    getSeconds: (value: Date) => number;
    getMilliseconds: (value: Date) => number;
    setYear: (value: Date, year: number) => Date;
    setMonth: (value: Date, month: number) => Date;
    setDate: (value: Date, date: number) => Date;
    setHours: (value: Date, hours: number) => Date;
    setMinutes: (value: Date, minutes: number) => Date;
    setSeconds: (value: Date, seconds: number) => Date;
    setMilliseconds: (value: Date, milliseconds: number) => Date;
    getDaysInMonth: (value: Date) => number;
    getWeekArray: (value: Date) => Date[][];
    getWeekNumber: (date: Date) => number;
    getDayOfWeek(value: Date): number;
    getYearRange: ([start, end]: [Date, Date]) => Date[];
}
export {};
