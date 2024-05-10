"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersModalDialog = PickersModalDialog;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _Fade = _interopRequireDefault(require("@mui/material/Fade"));
var _Dialog = _interopRequireWildcard(require("@mui/material/Dialog"));
var _styles = require("@mui/material/styles");
var _dimensions = require("../constants/dimensions");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PickersModalDialogRoot = (0, _styles.styled)(_Dialog.default)({
  [`& .${_Dialog.dialogClasses.container}`]: {
    outline: 0
  },
  [`& .${_Dialog.dialogClasses.paper}`]: {
    outline: 0,
    minWidth: _dimensions.DIALOG_WIDTH
  }
});
const PickersModalDialogContent = (0, _styles.styled)(_DialogContent.default)({
  '&:first-of-type': {
    padding: 0
  }
});
function PickersModalDialog(props) {
  const {
    children,
    onDismiss,
    open,
    slots,
    slotProps
  } = props;
  const Dialog = slots?.dialog ?? PickersModalDialogRoot;
  const Transition = slots?.mobileTransition ?? _Fade.default;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Dialog, (0, _extends2.default)({
    open: open,
    onClose: onDismiss
  }, slotProps?.dialog, {
    TransitionComponent: Transition,
    TransitionProps: slotProps?.mobileTransition,
    PaperComponent: slots?.mobilePaper,
    PaperProps: slotProps?.mobilePaper,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersModalDialogContent, {
      children: children
    })
  }));
}