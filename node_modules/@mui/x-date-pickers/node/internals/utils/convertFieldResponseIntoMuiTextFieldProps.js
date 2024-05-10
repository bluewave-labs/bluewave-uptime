"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertFieldResponseIntoMuiTextFieldProps = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
const _excluded = ["enableAccessibleFieldDOMStructure"],
  _excluded2 = ["InputProps", "readOnly"],
  _excluded3 = ["onPaste", "onKeyDown", "inputMode", "readOnly", "InputProps", "inputProps", "inputRef"];
const convertFieldResponseIntoMuiTextFieldProps = _ref => {
  let {
      enableAccessibleFieldDOMStructure
    } = _ref,
    fieldResponse = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  if (enableAccessibleFieldDOMStructure) {
    const {
        InputProps,
        readOnly
      } = fieldResponse,
      other = (0, _objectWithoutPropertiesLoose2.default)(fieldResponse, _excluded2);
    return (0, _extends2.default)({}, other, {
      InputProps: (0, _extends2.default)({}, InputProps ?? {}, {
        readOnly
      })
    });
  }
  const {
      onPaste,
      onKeyDown,
      inputMode,
      readOnly,
      InputProps,
      inputProps,
      inputRef
    } = fieldResponse,
    other = (0, _objectWithoutPropertiesLoose2.default)(fieldResponse, _excluded3);
  return (0, _extends2.default)({}, other, {
    InputProps: (0, _extends2.default)({}, InputProps ?? {}, {
      readOnly
    }),
    inputProps: (0, _extends2.default)({}, inputProps ?? {}, {
      inputMode,
      onPaste,
      onKeyDown,
      ref: inputRef
    })
  });
};
exports.convertFieldResponseIntoMuiTextFieldProps = convertFieldResponseIntoMuiTextFieldProps;