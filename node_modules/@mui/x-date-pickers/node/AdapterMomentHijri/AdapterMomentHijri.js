"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdapterMomentHijri = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _momentHijri = _interopRequireDefault(require("moment-hijri"));
var _AdapterMoment = require("../AdapterMoment");
/* eslint-disable class-methods-use-this */

// From https://momentjs.com/docs/#/displaying/format/
const formatTokenMap = {
  // Year
  iY: {
    sectionType: 'year',
    contentType: 'letter'
  },
  iYY: {
    sectionType: 'year',
    contentType: 'letter'
  },
  iYYYY: {
    sectionType: 'year',
    contentType: 'letter'
  },
  // Month
  iM: 'month',
  iMM: 'month',
  iMMM: {
    sectionType: 'month',
    contentType: 'letter'
  },
  iMMMM: {
    sectionType: 'month',
    contentType: 'letter'
  },
  // Day of the month
  iD: {
    sectionType: 'day',
    contentType: 'digit',
    maxLength: 2
  },
  iDD: 'day',
  // Meridiem
  A: 'meridiem',
  a: 'meridiem',
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
  year: 'iYYYY',
  month: 'iMMMM',
  monthShort: 'iMMM',
  dayOfMonth: 'iD',
  // Full day of the month format (i.e. 3rd) is not supported
  // Falling back to regular format
  dayOfMonthFull: 'iD',
  weekday: 'dddd',
  weekdayShort: 'ddd',
  hours24h: 'HH',
  hours12h: 'hh',
  meridiem: 'A',
  minutes: 'mm',
  seconds: 'ss',
  fullDate: 'iYYYY, iMMMM Do',
  keyboardDateTime: 'iYYYY/iMM/iDD LT',
  shortDate: 'iD iMMM',
  normalDate: 'dddd, iD iMMM',
  normalDateWithWeekday: 'DD iMMMM',
  fullTime: 'LT',
  fullTime12h: 'hh:mm A',
  fullTime24h: 'HH:mm',
  keyboardDate: 'iYYYY/iMM/iDD',
  keyboardDateTime12h: 'iYYYY/iMM/iDD hh:mm A',
  keyboardDateTime24h: 'iYYYY/iMM/iDD HH:mm'
};
const NUMBER_SYMBOL_MAP = {
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩',
  '0': '٠'
};
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
class AdapterMomentHijri extends _AdapterMoment.AdapterMoment {
  constructor({
    formats,
    instance
  } = {}) {
    super({
      locale: 'ar-SA',
      instance
    });
    this.lib = 'moment-hijri';
    this.moment = void 0;
    this.isTimezoneCompatible = false;
    this.formatTokenMap = formatTokenMap;
    this.date = value => {
      if (value === null) {
        return null;
      }
      return this.moment(value).locale('ar-SA');
    };
    this.getTimezone = () => {
      return 'default';
    };
    this.setTimezone = value => {
      return value;
    };
    this.parse = (value, format) => {
      if (value === '') {
        return null;
      }
      return this.moment(value, format, true).locale('ar-SA');
    };
    this.formatNumber = numberToFormat => {
      return numberToFormat.replace(/\d/g, match => NUMBER_SYMBOL_MAP[match]).replace(/,/g, '،');
    };
    this.startOfYear = value => {
      return value.clone().startOf('iYear');
    };
    this.startOfMonth = value => {
      return value.clone().startOf('iMonth');
    };
    this.endOfYear = value => {
      return value.clone().endOf('iYear');
    };
    this.endOfMonth = value => {
      return value.clone().endOf('iMonth');
    };
    this.addYears = (value, amount) => {
      return amount < 0 ? value.clone().subtract(Math.abs(amount), 'iYear') : value.clone().add(amount, 'iYear');
    };
    this.addMonths = (value, amount) => {
      return amount < 0 ? value.clone().subtract(Math.abs(amount), 'iMonth') : value.clone().add(amount, 'iMonth');
    };
    this.getYear = value => {
      return value.iYear();
    };
    this.getMonth = value => {
      return value.iMonth();
    };
    this.getDate = value => {
      return value.iDate();
    };
    this.setYear = (value, year) => {
      return value.clone().iYear(year);
    };
    this.setMonth = (value, month) => {
      return value.clone().iMonth(month);
    };
    this.setDate = (value, date) => {
      return value.clone().iDate(date);
    };
    this.getWeekNumber = value => {
      return value.iWeek();
    };
    this.getYearRange = ([start, end]) => {
      // moment-hijri only supports dates between 1356-01-01 H and 1499-12-29 H
      // We need to throw if outside min/max bounds, otherwise the while loop below will be infinite.
      if (start.isBefore('1937-03-14')) {
        throw new Error('min date must be on or after 1356-01-01 H (1937-03-14)');
      }
      if (end.isAfter('2076-11-26')) {
        throw new Error('max date must be on or before 1499-12-29 H (2076-11-26)');
      }
      return super.getYearRange([start, end]);
    };
    this.moment = instance || _momentHijri.default;
    this.locale = 'ar-SA';
    this.formats = (0, _extends2.default)({}, defaultFormats, formats);
  }
}
exports.AdapterMomentHijri = AdapterMomentHijri;