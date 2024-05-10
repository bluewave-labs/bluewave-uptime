"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleItemValueManager = exports.singleItemFieldValueManager = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _dateUtils = require("./date-utils");
var _getDefaultReferenceDate = require("./getDefaultReferenceDate");
var _useField = require("../hooks/useField/useField.utils");
const _excluded = ["value", "referenceDate"];
const singleItemValueManager = exports.singleItemValueManager = {
  emptyValue: null,
  getTodayValue: _dateUtils.getTodayDate,
  getInitialReferenceValue: _ref => {
    let {
        value,
        referenceDate
      } = _ref,
      params = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
    if (value != null && params.utils.isValid(value)) {
      return value;
    }
    if (referenceDate != null) {
      return referenceDate;
    }
    return (0, _getDefaultReferenceDate.getDefaultReferenceDate)(params);
  },
  cleanValue: _dateUtils.replaceInvalidDateByNull,
  areValuesEqual: _dateUtils.areDatesEqual,
  isSameError: (a, b) => a === b,
  hasError: error => error != null,
  defaultErrorState: null,
  getTimezone: (utils, value) => value == null || !utils.isValid(value) ? null : utils.getTimezone(value),
  setTimezone: (utils, timezone, value) => value == null ? null : utils.setTimezone(value, timezone)
};
const singleItemFieldValueManager = exports.singleItemFieldValueManager = {
  updateReferenceValue: (utils, value, prevReferenceValue) => value == null || !utils.isValid(value) ? prevReferenceValue : value,
  getSectionsFromValue: (utils, date, prevSections, getSectionsFromDate) => {
    const shouldReUsePrevDateSections = !utils.isValid(date) && !!prevSections;
    if (shouldReUsePrevDateSections) {
      return prevSections;
    }
    return getSectionsFromDate(date);
  },
  getV7HiddenInputValueFromSections: _useField.createDateStrForV7HiddenInputFromSections,
  getV6InputValueFromSections: _useField.createDateStrForV6InputFromSections,
  getActiveDateManager: (utils, state) => ({
    date: state.value,
    referenceDate: state.referenceValue,
    getSections: sections => sections,
    getNewValuesFromNewActiveDate: newActiveDate => ({
      value: newActiveDate,
      referenceValue: newActiveDate == null || !utils.isValid(newActiveDate) ? state.referenceValue : newActiveDate
    })
  }),
  parseValueStr: (valueStr, referenceValue, parseDate) => parseDate(valueStr.trim(), referenceValue)
};