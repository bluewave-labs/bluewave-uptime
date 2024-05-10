import { Locale as DateFnsLocale } from 'date-fns/locale/types';
import { AdapterFormats, AdapterOptions, MuiPickersAdapter } from '../models';
import { AdapterDateFnsBase } from '../AdapterDateFnsBase';
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
export declare class AdapterDateFns extends AdapterDateFnsBase<DateFnsLocale> implements MuiPickersAdapter<Date, DateFnsLocale> {
    constructor({ locale, formats }?: AdapterOptions<DateFnsLocale, never>);
    parse: (value: string, format: string) => any;
    isValid: (value: Date | null) => any;
    format: (value: Date, formatKey: keyof AdapterFormats) => any;
    formatByString: (value: Date, formatString: string) => any;
    isEqual: (value: Date | null, comparing: Date | null) => any;
    isSameYear: (value: Date, comparing: Date) => any;
    isSameMonth: (value: Date, comparing: Date) => any;
    isSameDay: (value: Date, comparing: Date) => any;
    isSameHour: (value: Date, comparing: Date) => any;
    isAfter: (value: Date, comparing: Date) => any;
    isAfterYear: (value: Date, comparing: Date) => any;
    isAfterDay: (value: Date, comparing: Date) => any;
    isBefore: (value: Date, comparing: Date) => any;
    isBeforeYear: (value: Date, comparing: Date) => any;
    isBeforeDay: (value: Date, comparing: Date) => any;
    isWithinRange: (value: Date, [start, end]: [Date, Date]) => any;
    startOfYear: (value: Date) => any;
    startOfMonth: (value: Date) => any;
    startOfWeek: (value: Date) => any;
    startOfDay: (value: Date) => any;
    endOfYear: (value: Date) => any;
    endOfMonth: (value: Date) => any;
    endOfWeek: (value: Date) => any;
    endOfDay: (value: Date) => any;
    addYears: (value: Date, amount: number) => any;
    addMonths: (value: Date, amount: number) => any;
    addWeeks: (value: Date, amount: number) => any;
    addDays: (value: Date, amount: number) => any;
    addHours: (value: Date, amount: number) => any;
    addMinutes: (value: Date, amount: number) => any;
    addSeconds: (value: Date, amount: number) => any;
    getYear: (value: Date) => any;
    getMonth: (value: Date) => any;
    getDate: (value: Date) => any;
    getHours: (value: Date) => any;
    getMinutes: (value: Date) => any;
    getSeconds: (value: Date) => any;
    getMilliseconds: (value: Date) => any;
    setYear: (value: Date, year: number) => any;
    setMonth: (value: Date, month: number) => any;
    setDate: (value: Date, date: number) => any;
    setHours: (value: Date, hours: number) => any;
    setMinutes: (value: Date, minutes: number) => any;
    setSeconds: (value: Date, seconds: number) => any;
    setMilliseconds: (value: Date, milliseconds: number) => any;
    getDaysInMonth: (value: Date) => any;
    getWeekArray: (value: Date) => Date[][];
    getWeekNumber: (value: Date) => any;
    getYearRange: ([start, end]: [Date, Date]) => Date[];
}
