import defaultMoment, { Moment } from 'moment';
import { AdapterFormats, AdapterOptions, DateBuilderReturnType, FieldFormatTokenMap, MuiPickersAdapter, PickersTimezone } from '../models';
declare module '@mui/x-date-pickers/models' {
    interface PickerValidDateLookup {
        moment: Moment;
    }
}
/**
 * Based on `@date-io/moment`
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
export declare class AdapterMoment implements MuiPickersAdapter<Moment, string> {
    isMUIAdapter: boolean;
    isTimezoneCompatible: boolean;
    lib: string;
    moment: typeof defaultMoment;
    locale?: string;
    formats: AdapterFormats;
    escapedCharacters: {
        start: string;
        end: string;
    };
    formatTokenMap: FieldFormatTokenMap;
    constructor({ locale, formats, instance }?: AdapterOptions<string, typeof defaultMoment>);
    private setLocaleToValue;
    private hasTimezonePlugin;
    private createSystemDate;
    private createUTCDate;
    private createTZDate;
    date: <T extends string | null | undefined>(value?: T, timezone?: PickersTimezone) => DateBuilderReturnType<T, Moment>;
    getInvalidDate: () => defaultMoment.Moment;
    getTimezone: (value: Moment) => string;
    setTimezone: (value: Moment, timezone: PickersTimezone) => Moment;
    toJsDate: (value: Moment) => Date;
    parse: (value: string, format: string) => defaultMoment.Moment | null;
    getCurrentLocaleCode: () => string;
    is12HourCycleInCurrentLocale: () => boolean;
    expandFormat: (format: string) => string;
    isValid: (value: Moment | null) => boolean;
    format: (value: Moment, formatKey: keyof AdapterFormats) => string;
    formatByString: (value: Moment, formatString: string) => string;
    formatNumber: (numberToFormat: string) => string;
    isEqual: (value: Moment | null, comparing: Moment | null) => boolean;
    isSameYear: (value: Moment, comparing: Moment) => boolean;
    isSameMonth: (value: Moment, comparing: Moment) => boolean;
    isSameDay: (value: Moment, comparing: Moment) => boolean;
    isSameHour: (value: Moment, comparing: Moment) => boolean;
    isAfter: (value: Moment, comparing: Moment) => boolean;
    isAfterYear: (value: Moment, comparing: Moment) => boolean;
    isAfterDay: (value: Moment, comparing: Moment) => boolean;
    isBefore: (value: Moment, comparing: Moment) => boolean;
    isBeforeYear: (value: Moment, comparing: Moment) => boolean;
    isBeforeDay: (value: Moment, comparing: Moment) => boolean;
    isWithinRange: (value: Moment, [start, end]: [Moment, Moment]) => boolean;
    startOfYear: (value: Moment) => defaultMoment.Moment;
    startOfMonth: (value: Moment) => defaultMoment.Moment;
    startOfWeek: (value: Moment) => defaultMoment.Moment;
    startOfDay: (value: Moment) => defaultMoment.Moment;
    endOfYear: (value: Moment) => defaultMoment.Moment;
    endOfMonth: (value: Moment) => defaultMoment.Moment;
    endOfWeek: (value: Moment) => defaultMoment.Moment;
    endOfDay: (value: Moment) => defaultMoment.Moment;
    addYears: (value: Moment, amount: number) => defaultMoment.Moment;
    addMonths: (value: Moment, amount: number) => defaultMoment.Moment;
    addWeeks: (value: Moment, amount: number) => defaultMoment.Moment;
    addDays: (value: Moment, amount: number) => defaultMoment.Moment;
    addHours: (value: Moment, amount: number) => defaultMoment.Moment;
    addMinutes: (value: Moment, amount: number) => defaultMoment.Moment;
    addSeconds: (value: Moment, amount: number) => defaultMoment.Moment;
    getYear: (value: Moment) => number;
    getMonth: (value: Moment) => number;
    getDate: (value: Moment) => number;
    getHours: (value: Moment) => number;
    getMinutes: (value: Moment) => number;
    getSeconds: (value: Moment) => number;
    getMilliseconds: (value: Moment) => number;
    setYear: (value: Moment, year: number) => defaultMoment.Moment;
    setMonth: (value: Moment, month: number) => defaultMoment.Moment;
    setDate: (value: Moment, date: number) => defaultMoment.Moment;
    setHours: (value: Moment, hours: number) => defaultMoment.Moment;
    setMinutes: (value: Moment, minutes: number) => defaultMoment.Moment;
    setSeconds: (value: Moment, seconds: number) => defaultMoment.Moment;
    setMilliseconds: (value: Moment, milliseconds: number) => defaultMoment.Moment;
    getDaysInMonth: (value: Moment) => number;
    getWeekArray: (value: Moment) => defaultMoment.Moment[][];
    getWeekNumber: (value: Moment) => number;
    getDayOfWeek: (value: Moment) => number;
    getYearRange([start, end]: [Moment, Moment]): defaultMoment.Moment[];
}
