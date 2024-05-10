"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdapterDateFnsJalali = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _addSeconds = _interopRequireDefault(require("date-fns-jalali/addSeconds"));
var _addMinutes = _interopRequireDefault(require("date-fns-jalali/addMinutes"));
var _addHours = _interopRequireDefault(require("date-fns-jalali/addHours"));
var _addDays = _interopRequireDefault(require("date-fns-jalali/addDays"));
var _addWeeks = _interopRequireDefault(require("date-fns-jalali/addWeeks"));
var _addMonths = _interopRequireDefault(require("date-fns-jalali/addMonths"));
var _addYears = _interopRequireDefault(require("date-fns-jalali/addYears"));
var _endOfDay = _interopRequireDefault(require("date-fns-jalali/endOfDay"));
var _endOfWeek = _interopRequireDefault(require("date-fns-jalali/endOfWeek"));
var _endOfYear = _interopRequireDefault(require("date-fns-jalali/endOfYear"));
var _format = _interopRequireDefault(require("date-fns-jalali/format"));
var _getHours = _interopRequireDefault(require("date-fns-jalali/getHours"));
var _getSeconds = _interopRequireDefault(require("date-fns-jalali/getSeconds"));
var _getMilliseconds = _interopRequireDefault(require("date-fns-jalali/getMilliseconds"));
var _getWeek = _interopRequireDefault(require("date-fns-jalali/getWeek"));
var _getYear = _interopRequireDefault(require("date-fns-jalali/getYear"));
var _getMonth = _interopRequireDefault(require("date-fns-jalali/getMonth"));
var _getDate = _interopRequireDefault(require("date-fns-jalali/getDate"));
var _getDaysInMonth = _interopRequireDefault(require("date-fns-jalali/getDaysInMonth"));
var _getMinutes = _interopRequireDefault(require("date-fns-jalali/getMinutes"));
var _isAfter = _interopRequireDefault(require("date-fns-jalali/isAfter"));
var _isBefore = _interopRequireDefault(require("date-fns-jalali/isBefore"));
var _isEqual = _interopRequireDefault(require("date-fns-jalali/isEqual"));
var _isSameDay = _interopRequireDefault(require("date-fns-jalali/isSameDay"));
var _isSameYear = _interopRequireDefault(require("date-fns-jalali/isSameYear"));
var _isSameMonth = _interopRequireDefault(require("date-fns-jalali/isSameMonth"));
var _isSameHour = _interopRequireDefault(require("date-fns-jalali/isSameHour"));
var _isValid = _interopRequireDefault(require("date-fns-jalali/isValid"));
var _parse = _interopRequireDefault(require("date-fns-jalali/parse"));
var _setDate = _interopRequireDefault(require("date-fns-jalali/setDate"));
var _setHours = _interopRequireDefault(require("date-fns-jalali/setHours"));
var _setMinutes = _interopRequireDefault(require("date-fns-jalali/setMinutes"));
var _setMonth = _interopRequireDefault(require("date-fns-jalali/setMonth"));
var _setSeconds = _interopRequireDefault(require("date-fns-jalali/setSeconds"));
var _setMilliseconds = _interopRequireDefault(require("date-fns-jalali/setMilliseconds"));
var _setYear = _interopRequireDefault(require("date-fns-jalali/setYear"));
var _startOfDay = _interopRequireDefault(require("date-fns-jalali/startOfDay"));
var _startOfMonth = _interopRequireDefault(require("date-fns-jalali/startOfMonth"));
var _endOfMonth = _interopRequireDefault(require("date-fns-jalali/endOfMonth"));
var _startOfWeek = _interopRequireDefault(require("date-fns-jalali/startOfWeek"));
var _startOfYear = _interopRequireDefault(require("date-fns-jalali/startOfYear"));
var _isWithinInterval = _interopRequireDefault(require("date-fns-jalali/isWithinInterval"));
var _faIR = _interopRequireDefault(require("date-fns-jalali/locale/fa-IR"));
var _longFormatters = _interopRequireDefault(require("date-fns-jalali/_lib/format/longFormatters"));
/* eslint-disable class-methods-use-this */

// @ts-ignore

const formatTokenMap = {
  // Year
  y: {
    sectionType: 'year',
    contentType: 'digit',
    maxLength: 4
  },
  yy: 'year',
  yyy: {
    sectionType: 'year',
    contentType: 'digit',
    maxLength: 4
  },
  yyyy: 'year',
  // Month
  M: {
    sectionType: 'month',
    contentType: 'digit',
    maxLength: 2
  },
  MM: 'month',
  MMMM: {
    sectionType: 'month',
    contentType: 'letter'
  },
  MMM: {
    sectionType: 'month',
    contentType: 'letter'
  },
  L: {
    sectionType: 'month',
    contentType: 'digit',
    maxLength: 2
  },
  LL: 'month',
  LLL: {
    sectionType: 'month',
    contentType: 'letter'
  },
  LLLL: {
    sectionType: 'month',
    contentType: 'letter'
  },
  // Day of the month
  d: {
    sectionType: 'day',
    contentType: 'digit',
    maxLength: 2
  },
  dd: 'day',
  do: {
    sectionType: 'day',
    contentType: 'digit-with-letter'
  },
  // Day of the week
  E: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  EE: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  EEE: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  EEEE: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  EEEEE: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  i: {
    sectionType: 'weekDay',
    contentType: 'digit',
    maxLength: 1
  },
  ii: 'weekDay',
  iii: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  iiii: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  e: {
    sectionType: 'weekDay',
    contentType: 'digit',
    maxLength: 1
  },
  ee: 'weekDay',
  eee: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  eeee: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  eeeee: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  eeeeee: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  c: {
    sectionType: 'weekDay',
    contentType: 'digit',
    maxLength: 1
  },
  cc: 'weekDay',
  ccc: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  cccc: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  ccccc: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  cccccc: {
    sectionType: 'weekDay',
    contentType: 'letter'
  },
  // Meridiem
  a: 'meridiem',
  aa: 'meridiem',
  aaa: 'meridiem',
  // Hours
  H: {
    sectionType: 'hours',
    contentType: 'digit',
    maxLength: 2
  },
  HH: 'hours',
  h: {
    sectionType: 'hours',
    contentType: 'digit',
    maxLength: 2
  },
  hh: 'hours',
  // Minutes
  m: {
    sectionType: 'minutes',
    contentType: 'digit',
    maxLength: 2
  },
  mm: 'minutes',
  // Seconds
  s: {
    sectionType: 'seconds',
    contentType: 'digit',
    maxLength: 2
  },
  ss: 'seconds'
};
const defaultFormats = {
  year: 'yyyy',
  month: 'LLLL',
  monthShort: 'MMM',
  dayOfMonth: 'd',
  dayOfMonthFull: 'do',
  weekday: 'EEEE',
  weekdayShort: 'EEEEEE',
  hours24h: 'HH',
  hours12h: 'hh',
  meridiem: 'aa',
  minutes: 'mm',
  seconds: 'ss',
  fullDate: 'PPP',
  keyboardDate: 'P',
  shortDate: 'd MMM',
  normalDate: 'd MMMM',
  normalDateWithWeekday: 'EEE, d MMMM',
  fullTime: 'p',
  fullTime12h: 'hh:mm aaa',
  fullTime24h: 'HH:mm',
  keyboardDateTime: 'P p',
  keyboardDateTime12h: 'P hh:mm aa',
  keyboardDateTime24h: 'P HH:mm'
};
const NUMBER_SYMBOL_MAP = {
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
  '0': '۰'
};
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
class AdapterDateFnsJalali {
  constructor({
    locale: _locale,
    formats
  } = {}) {
    this.isMUIAdapter = true;
    this.isTimezoneCompatible = false;
    this.lib = 'date-fns-jalali';
    this.locale = void 0;
    this.formats = void 0;
    this.formatTokenMap = formatTokenMap;
    this.escapedCharacters = {
      start: "'",
      end: "'"
    };
    this.date = value => {
      if (typeof value === 'undefined') {
        return new Date();
      }
      if (value === null) {
        return null;
      }
      return new Date(value);
    };
    this.getInvalidDate = () => new Date('Invalid Date');
    this.getTimezone = () => {
      return 'default';
    };
    this.setTimezone = value => {
      return value;
    };
    this.toJsDate = value => {
      return value;
    };
    this.parse = (value, format) => {
      if (value === '') {
        return null;
      }
      return (0, _parse.default)(value, format, new Date(), {
        locale: this.locale
      });
    };
    this.getCurrentLocaleCode = () => {
      return this.locale?.code || 'fa-IR';
    };
    // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
    // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.
    this.is12HourCycleInCurrentLocale = () => {
      if (this.locale) {
        return /a/.test(this.locale.formatLong.time());
      }

      // By default, date-fns-jalali is using fa-IR locale with am/pm enabled
      return true;
    };
    this.expandFormat = format => {
      // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
      const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
      const locale = this.locale ?? _faIR.default;
      return format.match(longFormatRegexp).map(token => {
        const firstCharacter = token[0];
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          const longFormatter = _longFormatters.default[firstCharacter];
          return longFormatter(token, locale.formatLong, {});
        }
        return token;
      }).join('');
    };
    this.isValid = value => {
      if (value == null) {
        return false;
      }
      return (0, _isValid.default)(value);
    };
    this.format = (value, formatKey) => {
      return this.formatByString(value, this.formats[formatKey]);
    };
    this.formatByString = (value, formatString) => {
      return (0, _format.default)(value, formatString, {
        locale: this.locale
      });
    };
    this.formatNumber = numberToFormat => {
      return numberToFormat.replace(/\d/g, match => NUMBER_SYMBOL_MAP[match]).replace(/,/g, '،');
    };
    this.isEqual = (value, comparing) => {
      if (value === null && comparing === null) {
        return true;
      }
      if (value === null || comparing === null) {
        return false;
      }
      return (0, _isEqual.default)(value, comparing);
    };
    this.isSameYear = (value, comparing) => {
      return (0, _isSameYear.default)(value, comparing);
    };
    this.isSameMonth = (value, comparing) => {
      return (0, _isSameMonth.default)(value, comparing);
    };
    this.isSameDay = (value, comparing) => {
      return (0, _isSameDay.default)(value, comparing);
    };
    this.isSameHour = (value, comparing) => {
      return (0, _isSameHour.default)(value, comparing);
    };
    this.isAfter = (value, comparing) => {
      return (0, _isAfter.default)(value, comparing);
    };
    this.isAfterYear = (value, comparing) => {
      return (0, _isAfter.default)(value, this.endOfYear(comparing));
    };
    this.isAfterDay = (value, comparing) => {
      return (0, _isAfter.default)(value, this.endOfDay(comparing));
    };
    this.isBefore = (value, comparing) => {
      return (0, _isBefore.default)(value, comparing);
    };
    this.isBeforeYear = (value, comparing) => {
      return (0, _isBefore.default)(value, this.startOfYear(comparing));
    };
    this.isBeforeDay = (value, comparing) => {
      return (0, _isBefore.default)(value, this.startOfDay(comparing));
    };
    this.isWithinRange = (value, [start, end]) => {
      return (0, _isWithinInterval.default)(value, {
        start,
        end
      });
    };
    this.startOfYear = value => {
      return (0, _startOfYear.default)(value);
    };
    this.startOfMonth = value => {
      return (0, _startOfMonth.default)(value);
    };
    this.startOfWeek = value => {
      return (0, _startOfWeek.default)(value, {
        locale: this.locale
      });
    };
    this.startOfDay = value => {
      return (0, _startOfDay.default)(value);
    };
    this.endOfYear = value => {
      return (0, _endOfYear.default)(value);
    };
    this.endOfMonth = value => {
      return (0, _endOfMonth.default)(value);
    };
    this.endOfWeek = value => {
      return (0, _endOfWeek.default)(value, {
        locale: this.locale
      });
    };
    this.endOfDay = value => {
      return (0, _endOfDay.default)(value);
    };
    this.addYears = (value, amount) => {
      return (0, _addYears.default)(value, amount);
    };
    this.addMonths = (value, amount) => {
      return (0, _addMonths.default)(value, amount);
    };
    this.addWeeks = (value, amount) => {
      return (0, _addWeeks.default)(value, amount);
    };
    this.addDays = (value, amount) => {
      return (0, _addDays.default)(value, amount);
    };
    this.addHours = (value, amount) => {
      return (0, _addHours.default)(value, amount);
    };
    this.addMinutes = (value, amount) => {
      return (0, _addMinutes.default)(value, amount);
    };
    this.addSeconds = (value, amount) => {
      return (0, _addSeconds.default)(value, amount);
    };
    this.getYear = value => {
      return (0, _getYear.default)(value);
    };
    this.getMonth = value => {
      return (0, _getMonth.default)(value);
    };
    this.getDate = value => {
      return (0, _getDate.default)(value);
    };
    this.getHours = value => {
      return (0, _getHours.default)(value);
    };
    this.getMinutes = value => {
      return (0, _getMinutes.default)(value);
    };
    this.getSeconds = value => {
      return (0, _getSeconds.default)(value);
    };
    this.getMilliseconds = value => {
      return (0, _getMilliseconds.default)(value);
    };
    this.setYear = (value, year) => {
      return (0, _setYear.default)(value, year);
    };
    this.setMonth = (value, month) => {
      return (0, _setMonth.default)(value, month);
    };
    this.setDate = (value, date) => {
      return (0, _setDate.default)(value, date);
    };
    this.setHours = (value, hours) => {
      return (0, _setHours.default)(value, hours);
    };
    this.setMinutes = (value, minutes) => {
      return (0, _setMinutes.default)(value, minutes);
    };
    this.setSeconds = (value, seconds) => {
      return (0, _setSeconds.default)(value, seconds);
    };
    this.setMilliseconds = (value, milliseconds) => {
      return (0, _setMilliseconds.default)(value, milliseconds);
    };
    this.getDaysInMonth = value => {
      return (0, _getDaysInMonth.default)(value);
    };
    this.getWeekArray = value => {
      const start = this.startOfWeek(this.startOfMonth(value));
      const end = this.endOfWeek(this.endOfMonth(value));
      let count = 0;
      let current = start;
      const nestedWeeks = [];
      while (this.isBefore(current, end)) {
        const weekNumber = Math.floor(count / 7);
        nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
        nestedWeeks[weekNumber].push(current);
        current = this.addDays(current, 1);
        count += 1;
      }
      return nestedWeeks;
    };
    this.getWeekNumber = date => {
      return (0, _getWeek.default)(date, {
        locale: this.locale
      });
    };
    this.getYearRange = ([start, end]) => {
      const startDate = this.startOfYear(start);
      const endDate = this.endOfYear(end);
      const years = [];
      let current = startDate;
      while (this.isBefore(current, endDate)) {
        years.push(current);
        current = this.addYears(current, 1);
      }
      return years;
    };
    this.locale = _locale;
    this.formats = (0, _extends2.default)({}, defaultFormats, formats);
  }
  getDayOfWeek(value) {
    return value.getDay() + 1;
  }
}
exports.AdapterDateFnsJalali = AdapterDateFnsJalali;