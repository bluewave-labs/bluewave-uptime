"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClearableField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/base/utils");
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _InputAdornment = _interopRequireDefault(require("@mui/material/InputAdornment"));
var _icons = require("../icons");
var _useUtils = require("../internals/hooks/useUtils");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["clearable", "onClear", "InputProps", "sx", "slots", "slotProps"],
  _excluded2 = ["ownerState"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useClearableField = props => {
  const localeText = (0, _useUtils.useLocaleText)();
  const {
      clearable,
      onClear,
      InputProps,
      sx,
      slots,
      slotProps
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const IconButton = slots?.clearButton ?? _IconButton.default;
  // The spread is here to avoid this bug mui/material-ui#34056
  const _useSlotProps = (0, _utils.useSlotProps)({
      elementType: IconButton,
      externalSlotProps: slotProps?.clearButton,
      ownerState: {},
      className: 'clearButton',
      additionalProps: {
        title: localeText.fieldClearLabel
      }
    }),
    iconButtonProps = (0, _objectWithoutPropertiesLoose2.default)(_useSlotProps, _excluded2);
  const EndClearIcon = slots?.clearIcon ?? _icons.ClearIcon;
  const endClearIconProps = (0, _utils.useSlotProps)({
    elementType: EndClearIcon,
    externalSlotProps: slotProps?.clearIcon,
    ownerState: {}
  });
  return (0, _extends2.default)({}, other, {
    InputProps: (0, _extends2.default)({}, InputProps, {
      endAdornment: /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [clearable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputAdornment.default, {
          position: "end",
          sx: {
            marginRight: InputProps?.endAdornment ? -1 : -1.5
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconButton, (0, _extends2.default)({}, iconButtonProps, {
            onClick: onClear,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(EndClearIcon, (0, _extends2.default)({
              fontSize: "small"
            }, endClearIconProps))
          }))
        }), InputProps?.endAdornment]
      })
    }),
    sx: [{
      '& .clearButton': {
        opacity: 1
      },
      '@media (pointer: fine)': {
        '& .clearButton': {
          opacity: 0
        },
        '&:hover, &:focus-within': {
          '.clearButton': {
            opacity: 1
          }
        }
      }
    }, ...(Array.isArray(sx) ? sx : [sx])]
  });
};
exports.useClearableField = useClearableField;