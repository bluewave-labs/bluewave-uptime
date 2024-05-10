"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridDateOperators = void 0;
var _GridFilterInputDate = require("../components/panel/filterPanel/GridFilterInputDate");
function buildApplyFilterFn(filterItem, compareFn, showTime, keepHours) {
  if (!filterItem.value) {
    return null;
  }
  const date = new Date(filterItem.value);
  if (showTime) {
    date.setSeconds(0, 0);
  } else {
    // In GMT-X timezone, the date will be one day behind.
    // For 2022-08-16:
    // GMT+2: Tue Aug 16 2022 02:00:00 GMT+0200
    // GMT-4: Mon Aug 15 2022 20:00:00 GMT-0400
    //
    // We need to add the offset before resetting the hours.
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    date.setHours(0, 0, 0, 0);
  }
  const time = date.getTime();
  return value => {
    if (!value) {
      return false;
    }
    if (keepHours) {
      return compareFn(value.getTime(), time);
    }

    // Make a copy of the date to not reset the hours in the original object
    const dateCopy = new Date(value);
    if (showTime) {
      dateCopy.setSeconds(0, 0);
    } else {
      dateCopy.setHours(0, 0, 0, 0);
    }
    return compareFn(dateCopy.getTime(), time);
  };
}
const getGridDateOperators = showTime => [{
  value: 'is',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 === value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'not',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 !== value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'after',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 > value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'onOrAfter',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 >= value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'before',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 < value2, showTime, !showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'onOrBefore',
  getApplyFilterFn: filterItem => {
    return buildApplyFilterFn(filterItem, (value1, value2) => value1 <= value2, showTime);
  },
  InputComponent: _GridFilterInputDate.GridFilterInputDate,
  InputComponentProps: {
    type: showTime ? 'datetime-local' : 'date'
  }
}, {
  value: 'isEmpty',
  getApplyFilterFn: () => {
    return value => {
      return value == null;
    };
  },
  requiresFilterValue: false
}, {
  value: 'isNotEmpty',
  getApplyFilterFn: () => {
    return value => {
      return value != null;
    };
  },
  requiresFilterValue: false
}];
exports.getGridDateOperators = getGridDateOperators;