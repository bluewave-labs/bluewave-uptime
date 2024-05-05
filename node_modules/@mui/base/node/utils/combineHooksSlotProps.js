"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineHooksSlotProps = combineHooksSlotProps;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
/**
 * Combines the two get*Props functions from Base UI hooks into one.
 * Useful when a hook uses two other hooks behind the scenes
 * (such as useSelect that depends on useList and useButton for its root slot).
 *
 * The resulting function will return the combined props.
 * They are merged from left to right, similarly to how Object.assign works.
 *
 * The getSecondProps function will receive the result of the getFirstProps function as its argument,
 * so its event handlers can call the previous handlers and act depending on its result.
 *
 * @param getFirstProps - A getter function that returns the props for the first slot. It receives the external event handlers as its argument.
 * @param getSecondProps - A getter function that returns the props for the second slot. It receives the result of the getFirstProps function as its argument.
 */
function combineHooksSlotProps(getFirstProps, getSecondProps) {
  return function getCombinedProps(external = {}) {
    const firstResult = (0, _extends2.default)({}, external, getFirstProps(external));
    const result = (0, _extends2.default)({}, firstResult, getSecondProps(firstResult));
    return result;
  };
}