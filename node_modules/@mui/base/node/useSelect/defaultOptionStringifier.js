"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptionStringifier = void 0;
const defaultOptionStringifier = option => {
  const {
    label,
    value
  } = option;
  if (typeof label === 'string') {
    return label;
  }
  if (typeof value === 'string') {
    return value;
  }

  // Fallback string representation
  return String(option);
};
exports.defaultOptionStringifier = defaultOptionStringifier;