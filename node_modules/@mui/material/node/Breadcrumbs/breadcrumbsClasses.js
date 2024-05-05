"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getBreadcrumbsUtilityClass = getBreadcrumbsUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getBreadcrumbsUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBreadcrumbs', slot);
}
const breadcrumbsClasses = (0, _generateUtilityClasses.default)('MuiBreadcrumbs', ['root', 'ol', 'li', 'separator']);
var _default = exports.default = breadcrumbsClasses;