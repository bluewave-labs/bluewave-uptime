import { FieldSectionContentType, FieldSectionType } from './fields';
import { PickersTimezone } from './timezone';
import { PickerValidDate } from './pickers';
export interface AdapterFormats {
    /**
     * The 4-digit year.
     * @example "2019"
     */
    year: string;
    /**
     * The full month name.
     * @example "January"
     */
    month: string;
    /**
     * The abbreviated month name.
     * @example "Jan"
     */
    monthShort: string;
    /**
     * The day of the month.
     * @example "1"
     */
    dayOfMonth: string;
    /**
     * The day of the month with letters.
     * @example "2nd"
     */
    dayOfMonthFull: string;
    /**
     * The name of the day of the week.
     * @example "Wednesday"
     */
    weekday: string;
    /**
     * The abbreviated name of the day of the week.
     * @example "Wed"
     * */
    weekdayShort: string;
    /**
     * The hours, 24-hour clock.
     * @example "23"
     */
    hours24h: string;
    /**
     * The hours, 12-hour clock.
     * @example "11"
     */
    hours12h: string;
    /**
     * The meridiem.
     * @example "AM"
     */
    meridiem: string;
    /**
     * The minutes.
     * @example "44"
     */
    minutes: string;
    /**
     * The seconds.
     * @example "00"
     */
    seconds: string;
    /** The localized full date.
     * Used for the aria-label of the opening button of the `DatePicker`.
     * @example "Jan 1, 2019"
     */
    fullDate: string;
    /**
     * A keyboard input friendly date format.
     * Used in the date fields.
     * @example "02/13/2020
     */
    keyboardDate: string;
    /**
     * The abbreviated month name and the day of the month.
     * Used in the `DateRangePicker` toolbar.
     * @example "Jan 1"
     */
    shortDate: string;
    /**
     * The month name and the day of the month.
     * Used in the `DatePicker` toolbar for non-english locales.
     * @example "1 January"
     */
    normalDate: string;
    /**
     * The month name, the day of the week and the day of the month.
     * Used in the `DatePicker` toolbar for english locales.
     * @example "Sun, Jan 1"
     */
    normalDateWithWeekday: string;
    /**
     * The hours and the minutes.
     * Used for the aria-label of the opening button of the `TimePicker`.
     * @example "11:44 PM" for locales with meridiem, "23:44" for locales without meridiem.
     */
    fullTime: string;
    /**
     * The hours with the meridiem and minutes.
     * @example "11:44 PM"
     */
    fullTime12h: string;
    /**
     * The hours without the meridiem and minutes.
     * @example "23:44"
     */
    fullTime24h: string;
    /**
     * A keyboard input friendly time format.
     * Used in the date-time fields.
     * @example "02/13/2020 11:44 PM" for locales with meridiem, "02/13/2020 23:44" for locales without meridiem.
     */
    keyboardDateTime: string;
    /**
     * A keyboard input friendly time format for 12-hour clock.
     * Used in the date-time fields.
     * @example "02/13/2020 11:44 PM"
     */
    keyboardDateTime12h: string;
    /**
     * A keyboard input friendly time format for 24-hour clock.
     * Used in the date-time fields.
     * @example "02/13/2020 23:44"
     */
    keyboardDateTime24h: string;
}
export type FieldFormatTokenMap = {
    [formatToken: string]: FieldSectionType | {
        sectionType: FieldSectionType;
        contentType: FieldSectionContentType;
        maxLength?: number;
    };
};
type PropertyIfNotNever<PName extends string, PType> = [PType] extends [never] ? {} : {
    [P in PName]?: PType;
};
export type AdapterOptions<TLocale, TInstance> = {
    formats?: Partial<AdapterFormats>;
    locale?: TLocale;
} & PropertyIfNotNever<'instance', TInstance>;
export type DateBuilderReturnType<T extends string | null | undefined, TDate> = T extends null ? null : TDate;
export interface MuiPickersAdapter<TDate extends PickerValidDate, TLocale = any> {
    /**
     * A boolean confirming that the adapter used is an MUI adapter.
     */
    isMUIAdapter: boolean;
    isTimezoneCompatible: boolean;
    formats: AdapterFormats;
    locale?: TLocale;
    /**
     * Name of the library that is used right now
     */
    lib: string;
    /**
     * The characters used to escape a string inside a format.
     */
    escapedCharacters: {
        start: string;
        end: string;
    };
    /**
     * A map containing all the format that the field components can understand.
     */
    formatTokenMap: FieldFormatTokenMap;
    /**
     * Create a date in the date library format.
     * If no `value` parameter is provided, creates a date with the current timestamp.
     * If a `value` parameter is provided, pass it to the date library to try to parse it.
     * @template TDate
     * @param {string | null | undefined} value The optional value to parse.
     * @param {PickersTimezone} timezone The timezone of the date. Default: "default"
     * @returns {TDate | null} The parsed date.
     */
    date<T extends string | null | undefined>(value?: T, timezone?: PickersTimezone): DateBuilderReturnType<T, TDate>;
    /**
     * Creates an invalid date in the date library format.
     * @returns {TDate} The invalid date.
     */
    getInvalidDate(): TDate;
    /**
     * Extracts the timezone from a date.
     * @template TDate
     * @param {TDate} value The date from which we want to get the timezone.
     */
    getTimezone(value: TDate | null): string;
    /**
     * Convert a date to another timezone.
     * @template TDate
     * @param {TDate} value The date to convert.
     * @param {PickersTimezone} timezone The timezone to convert the date to.
     * @returns {TDate} The converted date.
     */
    setTimezone(value: TDate, timezone: PickersTimezone): TDate;
    /**
     * Convert a date in the library format into a JavaScript `Date` object.
     * @template TDate
     * @param {TDate} value The value to convert.
     * @returns {Date} the JavaScript date.
     */
    toJsDate(value: TDate): Date;
    /**
     * Parse a string date in a specific format.
     * @template TDate
     * @param {string} value The string date to parse.
     * @param {string} format The format in which the string date is.
     * @returns {TDate | null} The parsed date.
     */
    parse(value: string, format: string): TDate | null;
    /**
     * Get the code of the locale currently used by the adapter.
     * @returns {string} The code of the locale.
     */
    getCurrentLocaleCode(): string;
    /**
     * Check if the current locale is using 12 hours cycle (i.e: time with meridiem).
     * @returns {boolean} `true` if the current locale is using 12 hours cycle.
     */
    is12HourCycleInCurrentLocale(): boolean;
    /**
     * Create a format with no meta-token (e.g: `LLL` or `PP`).
     * @param {string} format The format to expand.
     * @returns {string} The expanded format.
     */
    expandFormat(format: string): string;
    /**
     * Check if the date is valid.
     * @param {TDate | null} value The value to test.
     * @returns {boolean} `true` if the value is a valid date according to the date library.
     */
    isValid(value: TDate | null): boolean;
    /**
     * Format a date using an adapter format string (see the `AdapterFormats` interface)
     * @template TDate
     * @param {TDate} value The date to format.
     * @param {keyof AdapterFormats} formatKey The formatKey to use.
     * @returns {string} The stringify date.
     */
    format(value: TDate, formatKey: keyof AdapterFormats): string;
    /**
     * Format a date using a format of the date library.
     * @template TDate
     * @param {TDate} value The date to format.
     * @param {string} formatString The format to use.
     * @returns {string} The stringify date.
     */
    formatByString(value: TDate, formatString: string): string;
    /**
     * Format a number to be rendered in the clock.
     * Is being used in hijri and jalali adapters.
     * @param {string} numberToFormat The number to format.
     * @returns {string} The formatted number.
     */
    formatNumber(numberToFormat: string): string;
    /**
     * Check if the two dates are equal (e.g: they represent the same timestamp).
     * @param {TDate | null} value The reference date.
     * @param {TDate | null} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the two dates are equal.
     */
    isEqual(value: TDate | null, comparing: TDate | null): boolean;
    /**
     * Check if the two dates are in the same year (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the two dates are in the same year.
     */
    isSameYear(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the two dates are in the same month (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the two dates are in the same month.
     */
    isSameMonth(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the two dates are in the same day (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the two dates are in the same day.
     */
    isSameDay(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the two dates are at the same hour (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the two dates are in the same hour.
     */
    isSameHour(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the reference date is after the second date.
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the reference date is after the second date.
     */
    isAfter(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the year of the reference date is after the year of the second date (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the year of the reference date is after the year of the second date.
     */
    isAfterYear(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the day of the reference date is after the day of the second date (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the day of the reference date is after the day of the second date.
     */
    isAfterDay(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the reference date is before the second date.
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the reference date is before the second date.
     */
    isBefore(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the year of the reference date is before the year of the second date (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the year of the reference date is before the year of the second date.
     */
    isBeforeYear(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the day of the reference date is before the day of the second date (using the timezone of the reference date).
     * @template TDate
     * @param {TDate} value The reference date.
     * @param {TDate} comparing The date to compare with the reference date.
     * @returns {boolean} `true` if the day of the reference date is before the day of the second date.
     */
    isBeforeDay(value: TDate, comparing: TDate): boolean;
    /**
     * Check if the value is within the provided range.
     * @template TDate
     * @param {TDate} value The value to test.
     * @param {[TDate, TDate]} range The range in which the value should be.
     * @returns {boolean} `true` if the value is within the provided range.
     */
    isWithinRange(value: TDate, range: [TDate, TDate]): boolean;
    /**
     * Return the start of the year for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The start of the year of the given date.
     */
    startOfYear(value: TDate): TDate;
    /**
     * Return the start of the month for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The start of the month of the given date.
     */
    startOfMonth(value: TDate): TDate;
    /**
     * Return the start of the week for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The start of the week of the given date.
     */
    startOfWeek(value: TDate): TDate;
    /**
     * Return the start of the day for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The start of the day of the given date.
     */
    startOfDay(value: TDate): TDate;
    /**
     * Return the end of the year for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The end of the year of the given date.
     */
    endOfYear(value: TDate): TDate;
    /**
     * Return the end of the month for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The end of the month of the given date.
     */
    endOfMonth(value: TDate): TDate;
    /**
     * Return the end of the week for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The end of the week of the given date.
     */
    endOfWeek(value: TDate): TDate;
    /**
     * Return the end of the day for the given date.
     * @template TDate
     * @param {TDate} value The original date.
     * @returns {TDate} The end of the day of the given date.
     */
    endOfDay(value: TDate): TDate;
    /**
     * Add the specified number of years to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} amount The amount of years to be added.
     * @returns {TDate} The new date with the years added.
     */
    addYears(value: TDate, amount: number): TDate;
    /**
     * Add the specified number of months to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} amount The amount of months to be added.
     * @returns {TDate} The new date with the months added.
     */
    addMonths(value: TDate, amount: number): TDate;
    /**
     * Add the specified number of weeks to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} amount The amount of weeks to be added.
     * @returns {TDate} The new date with the weeks added.
     */
    addWeeks(value: TDate, amount: number): TDate;
    /**
     * Add the specified number of days to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} amount The amount of days to be added.
     * @returns {TDate} The new date with the days added.
     */
    addDays(value: TDate, amount: number): TDate;
    /**
     * Add the specified number of hours to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} amount The amount of hours to be added.
     * @returns {TDate} The new date with the hours added.
     */
    addHours(value: TDate, amount: number): TDate;
    /**
     * Add the specified number of minutes to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} amount The amount of minutes to be added.
     * @returns {TDate} The new date with the minutes added.
     */
    addMinutes(value: TDate, amount: number): TDate;
    /**
     * Add the specified number of seconds to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} amount The amount of seconds to be added.
     * @returns {TDate} The new date with the seconds added.
     */
    addSeconds(value: TDate, amount: number): TDate;
    /**
     * Get the year of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The year of the given date.
     */
    getYear(value: TDate): number;
    /**
     * Get the month of the given date.
     * The value is 0-based, in the Gregorian calendar January = 0, February = 1, ...
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The month of the given date.
     */
    getMonth(value: TDate): number;
    /**
     * Get the date (e.g: the day in the month) of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The date of the given date.
     */
    getDate(value: TDate): number;
    /**
     * Get the hours of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The hours of the given date.
     */
    getHours(value: TDate): number;
    /**
     * Get the minutes of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The minutes of the given date.
     */
    getMinutes(value: TDate): number;
    /**
     * Get the seconds of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The seconds of the given date.
     */
    getSeconds(value: TDate): number;
    /**
     * Get the milliseconds of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The milliseconds of the given date.
     */
    getMilliseconds(value: TDate): number;
    /**
     * Set the year to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} year The year of the new date.
     * @returns {TDate} The new date with the year set.
     */
    setYear(value: TDate, year: number): TDate;
    /**
     * Set the month to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} month The month of the new date.
     * @returns {TDate} The new date with the month set.
     */
    setMonth(value: TDate, month: number): TDate;
    /**
     * Set the date (e.g: the day in the month) to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} date The date of the new date.
     * @returns {TDate} The new date with the date set.
     */
    setDate(value: TDate, date: number): TDate;
    /**
     * Set the hours to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} hours The hours of the new date.
     * @returns {TDate} The new date with the hours set.
     */
    setHours(value: TDate, hours: number): TDate;
    /**
     * Set the minutes to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} minutes The minutes of the new date.
     * @returns {TDate} The new date with the minutes set.
     */
    setMinutes(value: TDate, minutes: number): TDate;
    /**
     * Set the seconds to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} seconds The seconds of the new date.
     * @returns {TDate} The new date with the seconds set.
     */
    setSeconds(value: TDate, seconds: number): TDate;
    /**
     * Set the milliseconds to the given date.
     * @template TDate
     * @param {TDate} value The date to be changed.
     * @param {number} milliseconds The milliseconds of the new date.
     * @returns {TDate} The new date with the milliseconds set.
     */
    setMilliseconds(value: TDate, milliseconds: number): TDate;
    /**
     * Get the number of days in a month of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The number of days in the month
     */
    getDaysInMonth(value: TDate): number;
    /**
     * Create a nested list with all the days of the month of the given date grouped by week.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {TDate[][]} A nested list with all the days of the month grouped by week.
     */
    getWeekArray(value: TDate): TDate[][];
    /**
     * Get the number of the week of the given date.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The number of the week of the given date.
     */
    getWeekNumber(value: TDate): number;
    /**
     * Get the number of the day of the week of the given date.
     * The value is 1-based, 1 - first day of the week, 7 - last day of the week.
     * @template TDate
     * @param {TDate} value The given date.
     * @returns {number} The number of the day of the week of the given date.
     */
    getDayOfWeek(value: TDate): number;
    /**
     * Create a list with all the years between the start and the end date.
     * @template TDate
     * @param {[TDate, TDate]} range The range of year to create.
     * @returns {TDate[]} List of all the years between the start end the end date.
     */
    getYearRange(range: [TDate, TDate]): TDate[];
}
export {};
