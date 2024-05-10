"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DemoContainer = DemoContainer;
exports.DemoItem = DemoItem;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _Stack = _interopRequireWildcard(require("@mui/material/Stack"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _TextField = require("@mui/material/TextField");
var _PickersTextField = require("@mui/x-date-pickers/PickersTextField");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getChildTypeFromChildName = childName => {
  if (childName.match(/^([A-Za-z]+)Range(Calendar|Clock)$/)) {
    return 'multi-panel-UI-view';
  }
  if (childName.match(/^([A-Za-z]*)(DigitalClock)$/)) {
    return 'Tall-UI-view';
  }
  if (childName.match(/^Static([A-Za-z]+)/) || childName.match(/^([A-Za-z]+)(Calendar|Clock)$/)) {
    return 'UI-view';
  }
  if (childName.match(/^MultiInput([A-Za-z]+)RangeField$/) || childName.match(/^([A-Za-z]+)RangePicker$/)) {
    return 'multi-input-range-field';
  }
  if (childName.match(/^SingleInput([A-Za-z]+)RangeField$/)) {
    return 'single-input-range-field';
  }
  return 'single-input-field';
};
const getSupportedSectionFromChildName = childName => {
  if (childName.includes('DateTime')) {
    return 'date-time';
  }
  if (childName.includes('Date')) {
    return 'date';
  }
  return 'time';
};
/**
 * WARNING: This is an internal component used in documentation to achieve a desired layout.
 * Please do not use it in your application.
 */
function DemoItem(props) {
  const {
    label,
    children,
    component,
    sx: sxProp
  } = props;
  let spacing;
  let sx = sxProp;
  if (component && getChildTypeFromChildName(component) === 'multi-input-range-field') {
    spacing = 1.5;
    sx = (0, _extends2.default)({}, sx, {
      [`& .${_TextField.textFieldClasses.root}`]: {
        flexGrow: 1
      }
    });
  } else {
    spacing = 1;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Stack.default, {
    direction: "column",
    alignItems: "stretch",
    spacing: spacing,
    sx: sx,
    children: [label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Typography.default, {
      variant: "body2",
      children: label
    }), children]
  });
}
DemoItem.displayName = 'DemoItem';
const isDemoItem = child => {
  if ( /*#__PURE__*/React.isValidElement(child) && typeof child.type !== 'string') {
    // @ts-ignore
    return child.type.displayName === 'DemoItem';
  }
  return false;
};
/**
 * WARNING: This is an internal component used in documentation to achieve a desired layout.
 * Please do not use it in your application.
 */
function DemoContainer(props) {
  const {
    children,
    components,
    sx: sxProp
  } = props;
  const childrenTypes = new Set();
  const childrenSupportedSections = new Set();
  components.forEach(childName => {
    childrenTypes.add(getChildTypeFromChildName(childName));
    childrenSupportedSections.add(getSupportedSectionFromChildName(childName));
  });
  const getSpacing = direction => {
    if (direction === 'row') {
      return childrenTypes.has('UI-view') || childrenTypes.has('Tall-UI-view') ? 3 : 2;
    }
    return childrenTypes.has('UI-view') ? 4 : 3;
  };
  let direction;
  let spacing;
  let extraSx = {};
  let demoItemSx = {};
  const sx = (0, _extends2.default)({
    overflow: 'auto',
    // Add padding as overflow can hide the outline text field label.
    pt: 1
  }, sxProp);
  if (components.length > 2 || childrenTypes.has('multi-input-range-field') || childrenTypes.has('single-input-range-field') || childrenTypes.has('multi-panel-UI-view') || childrenTypes.has('UI-view') || childrenSupportedSections.has('date-time')) {
    direction = 'column';
    spacing = getSpacing('column');
  } else {
    direction = {
      xs: 'column',
      lg: 'row'
    };
    spacing = {
      xs: getSpacing('column'),
      lg: getSpacing('row')
    };
  }
  if (childrenTypes.has('UI-view')) {
    // noop
  } else if (childrenTypes.has('single-input-range-field')) {
    if (!childrenSupportedSections.has('date-time')) {
      extraSx = {
        [`& > .${_TextField.textFieldClasses.root}, & > .${_PickersTextField.pickersTextFieldClasses.root}`]: {
          minWidth: 300
        }
      };
    } else {
      extraSx = {
        [`& > .${_TextField.textFieldClasses.root}, & > .${_PickersTextField.pickersTextFieldClasses.root}`]: {
          minWidth: {
            xs: 300,
            // If demo also contains MultiInputDateTimeRangeField, increase width to avoid cutting off the value.
            md: childrenTypes.has('multi-input-range-field') ? 460 : 400
          }
        }
      };
    }
  } else if (childrenSupportedSections.has('date-time')) {
    extraSx = {
      [`& > .${_TextField.textFieldClasses.root}, & > .${_PickersTextField.pickersTextFieldClasses.root}`]: {
        minWidth: 270
      }
    };
    if (childrenTypes.has('multi-input-range-field')) {
      // increase width for the multi input date time range fields
      demoItemSx = {
        [`& > .${_Stack.stackClasses.root} > .${_TextField.textFieldClasses.root}, & > .${_Stack.stackClasses.root} > .${_PickersTextField.pickersTextFieldClasses.root}`]: {
          minWidth: 210
        }
      };
    }
  } else {
    extraSx = {
      [`& > .${_TextField.textFieldClasses.root}, & > .${_PickersTextField.pickersTextFieldClasses.root}`]: {
        minWidth: 200
      }
    };
  }
  const finalSx = (0, _extends2.default)({}, sx, extraSx);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Stack.default, {
    direction: direction,
    spacing: spacing,
    sx: finalSx,
    children: React.Children.map(children, child => {
      if ( /*#__PURE__*/React.isValidElement(child) && isDemoItem(child)) {
        // Inject sx styles to the `DemoItem` if it is a direct child of `DemoContainer`.
        // @ts-ignore
        return /*#__PURE__*/React.cloneElement(child, {
          sx: (0, _extends2.default)({}, extraSx, demoItemSx)
        });
      }
      return child;
    })
  });
}