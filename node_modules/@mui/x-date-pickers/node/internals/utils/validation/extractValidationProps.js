"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractValidationProps = exports.TIME_VALIDATION_PROP_NAMES = exports.DATE_VALIDATION_PROP_NAMES = exports.DATE_TIME_VALIDATION_PROP_NAMES = void 0;
const DATE_VALIDATION_PROP_NAMES = exports.DATE_VALIDATION_PROP_NAMES = ['disablePast', 'disableFuture', 'minDate', 'maxDate', 'shouldDisableDate', 'shouldDisableMonth', 'shouldDisableYear'];
const TIME_VALIDATION_PROP_NAMES = exports.TIME_VALIDATION_PROP_NAMES = ['disablePast', 'disableFuture', 'minTime', 'maxTime', 'shouldDisableTime', 'minutesStep', 'ampm', 'disableIgnoringDatePartForTimeValidation'];
const DATE_TIME_VALIDATION_PROP_NAMES = exports.DATE_TIME_VALIDATION_PROP_NAMES = ['minDateTime', 'maxDateTime'];
const VALIDATION_PROP_NAMES = [...DATE_VALIDATION_PROP_NAMES, ...TIME_VALIDATION_PROP_NAMES, ...DATE_TIME_VALIDATION_PROP_NAMES];
/**
 * Extract the validation props for the props received by a component.
 * Limit the risk of forgetting some of them and reduce the bundle size.
 */
const extractValidationProps = props => VALIDATION_PROP_NAMES.reduce((extractedProps, propName) => {
  if (props.hasOwnProperty(propName)) {
    extractedProps[propName] = props[propName];
  }
  return extractedProps;
}, {});
exports.extractValidationProps = extractValidationProps;