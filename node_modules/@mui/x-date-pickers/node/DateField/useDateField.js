"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateField = void 0;
var _valueManagers = require("../internals/utils/valueManagers");
var _useField = require("../internals/hooks/useField");
var _validateDate = require("../internals/utils/validation/validateDate");
var _fields = require("../internals/utils/fields");
var _defaultizedFieldProps = require("../internals/hooks/defaultizedFieldProps");
const useDateField = inProps => {
  const props = (0, _defaultizedFieldProps.useDefaultizedDateField)(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _fields.splitFieldInternalAndForwardedProps)(props, 'date');
  return (0, _useField.useField)({
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.singleItemValueManager,
    fieldValueManager: _valueManagers.singleItemFieldValueManager,
    validator: _validateDate.validateDate,
    valueType: 'date'
  });
};
exports.useDateField = useDateField;