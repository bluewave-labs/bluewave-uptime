"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDateTime = void 0;
var _validateDate = require("./validateDate");
var _validateTime = require("./validateTime");
const validateDateTime = ({
  props,
  value,
  adapter
}) => {
  const dateValidationResult = (0, _validateDate.validateDate)({
    adapter,
    value,
    props
  });
  if (dateValidationResult !== null) {
    return dateValidationResult;
  }
  return (0, _validateTime.validateTime)({
    adapter,
    value,
    props
  });
};
exports.validateDateTime = validateDateTime;