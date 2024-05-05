"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOption = useOption;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/utils");
var _extractEventHandlers = require("../utils/extractEventHandlers");
var _useList = require("../useList");
var _useCompound = require("../useCompound");
var _useButton = require("../useButton");
var _combineHooksSlotProps = require("../utils/combineHooksSlotProps");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOption API](https://mui.com/base-ui/react-select/hooks-api/#use-option)
 */
function useOption(params) {
  const {
    value,
    label,
    disabled,
    rootRef: optionRefParam,
    id: idParam
  } = params;
  const {
    getRootProps: getListItemProps,
    highlighted,
    selected
  } = (0, _useList.useListItem)({
    item: value
  });
  const {
    getRootProps: getButtonProps,
    rootRef: buttonRefHandler
  } = (0, _useButton.useButton)({
    disabled,
    focusableWhenDisabled: true
  });
  const id = (0, _utils.unstable_useId)(idParam);
  const optionRef = React.useRef(null);
  const selectOption = React.useMemo(() => ({
    disabled,
    label,
    value,
    ref: optionRef,
    id
  }), [disabled, label, value, id]);
  const {
    index
  } = (0, _useCompound.useCompoundItem)(value, selectOption);
  const handleRef = (0, _utils.unstable_useForkRef)(optionRefParam, optionRef, buttonRefHandler);
  const createHandleKeyDown = otherHandlers => event => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if ([' ', 'Enter'].includes(event.key)) {
      event.defaultMuiPrevented = true; // prevent listbox onKeyDown
    }
  };
  const getOwnHandlers = (otherHandlers = {}) => ({
    onKeyDown: createHandleKeyDown(otherHandlers)
  });
  return {
    getRootProps: (externalProps = {}) => {
      const externalEventHandlers = (0, _extractEventHandlers.extractEventHandlers)(externalProps);
      const getCombinedRootProps = (0, _combineHooksSlotProps.combineHooksSlotProps)(getListItemProps, (0, _combineHooksSlotProps.combineHooksSlotProps)(getButtonProps, getOwnHandlers));
      return (0, _extends2.default)({}, externalProps, externalEventHandlers, getCombinedRootProps(externalEventHandlers), {
        id,
        ref: handleRef,
        role: 'option',
        'aria-selected': selected
      });
    },
    highlighted,
    index,
    selected,
    rootRef: handleRef
  };
}