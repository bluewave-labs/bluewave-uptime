import defaultDayjs, { Dayjs } from 'dayjs';
import { FieldFormatTokenMap, MuiPickersAdapter, AdapterFormats, AdapterOptions, PickersTimezone, DateBuilderReturnType } from '../models';
type Constructor = (...args: Parameters<typeof defaultDayjs>) => Dayjs;
declare module '@mui/x-date-pickers/models' {
    interface PickerValidDateLookup {
        dayjs: Dayjs;
    }
}
/**
 * Based on `@date-io/dayjs`
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
export declare class AdapterDayjs implements MuiPickersAdapter<Dayjs, string> {
    isMUIAdapter: boolean;
    isTimezoneCompatible: boolean;
    lib: string;
    dayjs: Constructor;
    locale?: string;
    formats: AdapterFormats;
    escapedCharacters: {
        start: string;
        end: string;
    };
    formatTokenMap: FieldFormatTokenMap;
    constructor({ locale, formats }?: AdapterOptions<string, never>);
    private setLocaleToValue;
    private hasUTCPlugin;
    private hasTimezonePlugin;
    private isSame;
    /**
     * Replaces "default" by undefined and "system" by the system timezone before passing it to `dayjs`.
     */
    private cleanTimezone;
    private createSystemDate;
    private createUTCDate;
    private createTZDate;
    private getLocaleFormats;
    /**
     * If the new day does not have the same offset as the old one (when switching to summer day time for example),
     * Then dayjs will not automatically adjust the offset (moment does).
     * We have to parse again the value to make sure the `fixOffset` method is applied.
     * See https://github.com/iamkun/dayjs/blob/b3624de619d6e734cd0ffdbbd3502185041c1b60/src/plugin/timezone/index.js#L72
     */
    private adjustOffset;
    date: <T extends string | null | undefined>(value?: T, timezone?: PickersTimezone) => DateBuilderReturnType<T, Dayjs>;
    getInvalidDate: () => defaultDayjs.Dayjs;
    getTimezone: (value: Dayjs) => string;
    setTimezone: (value: Dayjs, timezone: PickersTimezone) => Dayjs;
    toJsDate: (value: Dayjs) => Date;
    parse: (value: string, format: string) => defaultDayjs.Dayjs | null;
    getCurrentLocaleCode: () => string;
    is12HourCycleInCurrentLocale: () => boolean;
    expandFormat: (format: string) => string;
    isValid: (value: Dayjs | null) => boolean;
    format: (value: Dayjs, formatKey: keyof AdapterFormats) => string;
    formatByString: (value: Dayjs, formatString: string) => string;
    formatNumber: (numberToFormat: string) => string;
    isEqual: (value: Dayjs | null, comparing: Dayjs | null) => boolean;
    isSameYear: (value: Dayjs, comparing: Dayjs) => boolean;
    isSameMonth: (value: Dayjs, comparing: Dayjs) => boolean;
    isSameDay: (value: Dayjs, comparing: Dayjs) => boolean;
    isSameHour: (value: Dayjs, comparing: Dayjs) => boolean;
    isAfter: (value: Dayjs, comparing: Dayjs) => boolean;
    isAfterYear: (value: Dayjs, comparing: Dayjs) => boolean;
    isAfterDay: (value: Dayjs, comparing: Dayjs) => boolean;
    isBefore: (value: Dayjs, comparing: Dayjs) => boolean;
    isBeforeYear: (value: Dayjs, comparing: Dayjs) => boolean;
    isBeforeDay: (value: Dayjs, comparing: Dayjs) => boolean;
    isWithinRange: (value: Dayjs, [start, end]: [Dayjs, Dayjs]) => boolean;
    startOfYear: (value: Dayjs) => defaultDayjs.Dayjs;
    startOfMonth: (value: Dayjs) => defaultDayjs.Dayjs;
    startOfWeek: (value: Dayjs) => defaultDayjs.Dayjs;
    startOfDay: (value: Dayjs) => defaultDayjs.Dayjs;
    endOfYear: (value: Dayjs) => defaultDayjs.Dayjs;
    endOfMonth: (value: Dayjs) => defaultDayjs.Dayjs;
    endOfWeek: (value: Dayjs) => defaultDayjs.Dayjs;
    endOfDay: (value: Dayjs) => defaultDayjs.Dayjs;
    addYears: (value: Dayjs, amount: number) => defaultDayjs.Dayjs;
    addMonths: (value: Dayjs, amount: number) => defaultDayjs.Dayjs;
    addWeeks: (value: Dayjs, amount: number) => defaultDayjs.Dayjs;
    addDays: (value: Dayjs, amount: number) => defaultDayjs.Dayjs;
    addHours: (value: Dayjs, amount: number) => defaultDayjs.Dayjs;
    addMinutes: (value: Dayjs, amount: number) => defaultDayjs.Dayjs;
    addSeconds: (value: Dayjs, amount: number) => defaultDayjs.Dayjs;
    getYear: (value: Dayjs) => number;
    getMonth: (value: Dayjs) => number;
    getDate: (value: Dayjs) => number;
    getHours: (value: Dayjs) => number;
    getMinutes: (value: Dayjs) => number;
    getSeconds: (value: Dayjs) => number;
    getMilliseconds: (value: Dayjs) => number;
    setYear: (value: Dayjs, year: number) => defaultDayjs.Dayjs;
    setMonth: (value: Dayjs, month: number) => defaultDayjs.Dayjs;
    setDate: (value: Dayjs, date: number) => defaultDayjs.Dayjs;
    setHours: (value: Dayjs, hours: number) => defaultDayjs.Dayjs;
    setMinutes: (value: Dayjs, minutes: number) => defaultDayjs.Dayjs;
    setSeconds: (value: Dayjs, seconds: number) => defaultDayjs.Dayjs;
    setMilliseconds: (value: Dayjs, milliseconds: number) => defaultDayjs.Dayjs;
    getDaysInMonth: (value: Dayjs) => number;
    getWeekArray: (value: Dayjs) => defaultDayjs.Dayjs[][];
    getWeekNumber: (value: Dayjs) => number;
    getDayOfWeek(value: Dayjs): number;
    getYearRange: ([start, end]: [Dayjs, Dayjs]) => defaultDayjs.Dayjs[];
}
export {};
