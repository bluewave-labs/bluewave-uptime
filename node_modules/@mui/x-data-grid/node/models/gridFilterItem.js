"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridLogicOperator = void 0;
/**
 * Filter item definition interface.
 * @demos
 *   - [Custom filter operator](/x/react-data-grid/filtering/customization/#create-a-custom-operator)
 */
var GridLogicOperator = exports.GridLogicOperator = /*#__PURE__*/function (GridLogicOperator) {
  GridLogicOperator["And"] = "and";
  GridLogicOperator["Or"] = "or";
  return GridLogicOperator;
}(GridLogicOperator || {});