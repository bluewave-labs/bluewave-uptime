"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdapterDateFnsBase = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
/* eslint-disable class-methods-use-this */

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
  fullDate: 'PP',
  keyboardDate: 'P',
  shortDate: 'MMM d',
  normalDate: 'd MMMM',
  normalDateWithWeekday: 'EEE, MMM d',
  fullTime: 'p',
  fullTime12h: 'hh:mm aa',
  fullTime24h: 'HH:mm',
  keyboardDateTime: 'P p',
  keyboardDateTime12h: 'P hh:mm aa',
  keyboardDateTime24h: 'P HH:mm'
};
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
class AdapterDateFnsBase {
  constructor(props) {
    this.isMUIAdapter = true;
    this.isTimezoneCompatible = false;
    this.lib = 'date-fns';
    this.locale = void 0;
    this.formats = void 0;
    this.formatTokenMap = formatTokenMap;
    this.escapedCharacters = {
      start: "'",
      end: "'"
    };
    this.longFormatters = void 0;
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
    this.getCurrentLocaleCode = () => {
      return this.locale?.code || 'en-US';
    };
    // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
    // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.
    this.is12HourCycleInCurrentLocale = () => {
      if (this.locale) {
        return /a/.test(this.locale.formatLong.time({
          width: 'short'
        }));
      }

      // By default, date-fns is using en-US locale with am/pm enabled
      return true;
    };
    this.expandFormat = format => {
      const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

      // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
      return format.match(longFormatRegexp).map(token => {
        const firstCharacter = token[0];
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          const longFormatter = this.longFormatters[firstCharacter];
          return longFormatter(token, this.locale.formatLong);
        }
        return token;
      }).join('');
    };
    this.formatNumber = numberToFormat => {
      return numberToFormat;
    };
    this.getDayOfWeek = value => {
      return value.getDay() + 1;
    };
    const {
      locale,
      formats,
      longFormatters
    } = props;
    this.locale = locale;
    this.formats = (0, _extends2.default)({}, defaultFormats, formats);
    this.longFormatters = longFormatters;
  }
}
exports.AdapterDateFnsBase = AdapterDateFnsBase;