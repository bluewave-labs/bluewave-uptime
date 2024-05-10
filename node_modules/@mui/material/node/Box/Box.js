"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _system = require("@mui/system");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _className = require("../className");
var _styles = require("../styles");
var _identifier = _interopRequireDefault(require("../styles/identifier"));
var _boxClasses = _interopRequireDefault(require("./boxClasses"));
const defaultTheme = (0, _styles.createTheme)();
const Box = (0, _system.createBox)({
  themeId: _identifier.default,
  defaultTheme,
  defaultClassName: _boxClasses.default.root,
  generateClassName: _className.unstable_ClassNameGenerator.generate
});
process.env.NODE_ENV !== "production" ? Box.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
var _default = exports.default = Box;