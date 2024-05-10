"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdapterMomentJalaali = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));
var _AdapterMoment = require("../AdapterMoment");
/* eslint-disable class-methods-use-this */

// From https://momentjs.com/docs/#/displaying/format/
const formatTokenMap = {
  // Year
  jYY: 'year',
  jYYYY: {
    sectionType: 'year',
    contentType: 'digit',
    maxLength: 4
  },
  // Month
  jM: {
    sectionType: 'month',
    contentType: 'digit',
    maxLength: 2
  },
  jMM: 'month',
  jMMM: {
    sectionType: 'month',
    contentType: 'letter'
  },
  jMMMM: {
    sectionType: 'month',
    contentType: 'letter'
  },
  // Day of the month
  jD: {
    sectionType: 'day',
    contentType: 'digit',
    maxLength: 2
  },
  jDD: 'day',
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
  year: 'jYYYY',
  month: 'jMMMM',
  monthShort: 'jMMM',
  dayOfMonth: 'jD',
  // Full day of the month format (i.e. 3rd) is not supported
  // Falling back to regular format
  dayOfMonthFull: 'jD',
  weekday: 'dddd',
  weekdayShort: 'ddd',
  hours24h: 'HH',
  hours12h: 'hh',
  meridiem: 'A',
  minutes: 'mm',
  seconds: 'ss',
  fullDate: 'jYYYY, jMMMM Do',
  keyboardDate: 'jYYYY/jMM/jDD',
  shortDate: 'jD jMMM',
  normalDate: 'dddd, jD jMMM',
  normalDateWithWeekday: 'DD MMMM',
  fullTime: 'LT',
  fullTime12h: 'hh:mm A',
  fullTime24h: 'HH:mm',
  keyboardDateTime: 'jYYYY/jMM/jDD LT',
  keyboardDateTime12h: 'jYYYY/jMM/jDD hh:mm A',
  keyboardDateTime24h: 'jYYYY/jMM/jDD HH:mm'
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
 * Based on `@date-io/jalaali`
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
class AdapterMomentJalaali extends _AdapterMoment.AdapterMoment {
  constructor({
    formats,
    instance
  } = {}) {
    super({
      locale: 'fa',
      instance
    });
    this.isTimezoneCompatible = false;
    this.lib = 'moment-jalaali';
    this.moment = void 0;
    this.formatTokenMap = formatTokenMap;
    this.date = value => {
      if (value === null) {
        return null;
      }
      return this.moment(value).locale('fa');
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
      return this.moment(value, format, true).locale('fa');
    };
    this.formatNumber = numberToFormat => {
      return numberToFormat.replace(/\d/g, match => NUMBER_SYMBOL_MAP[match]).replace(/,/g, '،');
    };
    this.isSameYear = (value, comparing) => {
      // `isSame` seems to mutate the date on `moment-jalaali`
      // @ts-ignore
      return value.clone().isSame(comparing, 'jYear');
    };
    this.isSameMonth = (value, comparing) => {
      // `isSame` seems to mutate the date on `moment-jalaali`
      // @ts-ignore
      return value.clone().isSame(comparing, 'jMonth');
    };
    this.isAfterYear = (value, comparing) => {
      return value.jYear() > comparing.jYear();
    };
    this.isBeforeYear = (value, comparing) => {
      return value.jYear() < comparing.jYear();
    };
    this.startOfYear = value => {
      return value.clone().startOf('jYear');
    };
    this.startOfMonth = value => {
      return value.clone().startOf('jMonth');
    };
    this.endOfYear = value => {
      return value.clone().endOf('jYear');
    };
    this.endOfMonth = value => {
      return value.clone().endOf('jMonth');
    };
    this.addYears = (value, amount) => {
      return amount < 0 ? value.clone().subtract(Math.abs(amount), 'jYear') : value.clone().add(amount, 'jYear');
    };
    this.addMonths = (value, amount) => {
      return amount < 0 ? value.clone().subtract(Math.abs(amount), 'jMonth') : value.clone().add(amount, 'jMonth');
    };
    this.getYear = value => {
      return value.jYear();
    };
    this.getMonth = value => {
      return value.jMonth();
    };
    this.getDate = value => {
      return value.jDate();
    };
    this.setYear = (value, year) => {
      return value.clone().jYear(year);
    };
    this.setMonth = (value, month) => {
      return value.clone().jMonth(month);
    };
    this.setDate = (value, date) => {
      return value.clone().jDate(date);
    };
    this.getWeekNumber = value => {
      return value.jWeek();
    };
    this.moment = instance || _momentJalaali.default;
    this.locale = 'fa';
    this.formats = (0, _extends2.default)({}, defaultFormats, formats);
  }
}
exports.AdapterMomentJalaali = AdapterMomentJalaali;