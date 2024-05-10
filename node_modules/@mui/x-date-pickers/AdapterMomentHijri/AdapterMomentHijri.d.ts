import defaultHMoment, { Moment } from 'moment-hijri';
import { AdapterMoment } from '../AdapterMoment';
import { AdapterOptions, DateBuilderReturnType, FieldFormatTokenMap, MuiPickersAdapter } from '../models';
declare module '@mui/x-date-pickers/models' {
    interface PickerValidDateLookup {
        'moment-hijri': Moment;
    }
}
/**
 * Based on `@date-io/hijri`
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
export declare class AdapterMomentHijri extends AdapterMoment implements MuiPickersAdapter<Moment, string> {
    lib: string;
    moment: typeof defaultHMoment;
    isTimezoneCompatible: boolean;
    formatTokenMap: FieldFormatTokenMap;
    constructor({ formats, instance }?: AdapterOptions<string, typeof defaultHMoment>);
    date: <T extends string | null | undefined>(value?: T) => DateBuilderReturnType<T, Moment>;
    getTimezone: () => string;
    setTimezone: (value: Moment) => Moment;
    parse: (value: string, format: string) => defaultHMoment.Moment | null;
    formatNumber: (numberToFormat: string) => string;
    startOfYear: (value: Moment) => defaultHMoment.Moment;
    startOfMonth: (value: Moment) => defaultHMoment.Moment;
    endOfYear: (value: Moment) => defaultHMoment.Moment;
    endOfMonth: (value: Moment) => defaultHMoment.Moment;
    addYears: (value: Moment, amount: number) => defaultHMoment.Moment;
    addMonths: (value: Moment, amount: number) => defaultHMoment.Moment;
    getYear: (value: Moment) => number;
    getMonth: (value: Moment) => number;
    getDate: (value: Moment) => number;
    setYear: (value: Moment, year: number) => defaultHMoment.Moment;
    setMonth: (value: Moment, month: number) => defaultHMoment.Moment;
    setDate: (value: Moment, date: number) => defaultHMoment.Moment;
    getWeekNumber: (value: Moment) => number;
    getYearRange: ([start, end]: [Moment, Moment]) => defaultHMoment.Moment[];
}
