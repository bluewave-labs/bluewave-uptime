"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimeField = void 0;
var _valueManagers = require("../internals/utils/valueManagers");
var _useField = require("../internals/hooks/useField");
var _validateTime = require("../internals/utils/validation/validateTime");
var _fields = require("../internals/utils/fields");
var _defaultizedFieldProps = require("../internals/hooks/defaultizedFieldProps");
const useTimeField = inProps => {
  const props = (0, _defaultizedFieldProps.useDefaultizedTimeField)(inProps);
  const {
    forwardedProps,
    internalProps
  } = (0, _fields.splitFieldInternalAndForwardedProps)(props, 'time');
  return (0, _useField.useField)({
    forwardedProps,
    internalProps,
    valueManager: _valueManagers.singleItemValueManager,
    fieldValueManager: _valueManagers.singleItemFieldValueManager,
    validator: _validateTime.validateTime,
    valueType: 'time'
  });
};
exports.useTimeField = useTimeField;