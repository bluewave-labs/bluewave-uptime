"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitFieldInternalAndForwardedProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _extractValidationProps = require("./validation/extractValidationProps");
const SHARED_FIELD_INTERNAL_PROP_NAMES = ['value', 'defaultValue', 'referenceDate', 'format', 'formatDensity', 'onChange', 'timezone', 'onError', 'shouldRespectLeadingZeros', 'selectedSections', 'onSelectedSectionsChange', 'unstableFieldRef', 'enableAccessibleFieldDOMStructure', 'disabled', 'readOnly', 'dateSeparator'];
const splitFieldInternalAndForwardedProps = (props, valueType) => {
  const forwardedProps = (0, _extends2.default)({}, props);
  const internalProps = {};
  const extractProp = propName => {
    if (forwardedProps.hasOwnProperty(propName)) {
      // @ts-ignore
      internalProps[propName] = forwardedProps[propName];
      delete forwardedProps[propName];
    }
  };
  SHARED_FIELD_INTERNAL_PROP_NAMES.forEach(extractProp);
  if (valueType === 'date') {
    _extractValidationProps.DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
  } else if (valueType === 'time') {
    _extractValidationProps.TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
  } else if (valueType === 'date-time') {
    _extractValidationProps.DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
    _extractValidationProps.TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
    _extractValidationProps.DATE_TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
  }
  return {
    forwardedProps,
    internalProps
  };
};
exports.splitFieldInternalAndForwardedProps = splitFieldInternalAndForwardedProps;