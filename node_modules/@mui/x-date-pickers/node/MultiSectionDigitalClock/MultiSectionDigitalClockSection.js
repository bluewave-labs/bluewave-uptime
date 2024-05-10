"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSectionDigitalClockSection = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _MenuList = _interopRequireDefault(require("@mui/material/MenuList"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _multiSectionDigitalClockSectionClasses = require("./multiSectionDigitalClockSectionClasses");
var _dimensions = require("../internals/constants/dimensions");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["autoFocus", "onChange", "className", "disabled", "readOnly", "items", "active", "slots", "slotProps", "skipDisabled"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    item: ['item']
  };
  return (0, _composeClasses.default)(slots, _multiSectionDigitalClockSectionClasses.getMultiSectionDigitalClockSectionUtilityClass, classes);
};
const MultiSectionDigitalClockSectionRoot = (0, _styles.styled)(_MenuList.default, {
  name: 'MuiMultiSectionDigitalClockSection',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  maxHeight: _dimensions.DIGITAL_CLOCK_VIEW_HEIGHT,
  width: 56,
  padding: 0,
  overflow: 'hidden',
  '@media (prefers-reduced-motion: no-preference)': {
    scrollBehavior: 'auto'
  },
  '@media (pointer: fine)': {
    '&:hover': {
      overflowY: 'auto'
    }
  },
  '@media (pointer: none), (pointer: coarse)': {
    overflowY: 'auto'
  },
  '&:not(:first-of-type)': {
    borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`
  },
  '&::after': {
    display: 'block',
    content: '""',
    // subtracting the height of one item, extra margin and borders to make sure the max height is correct
    height: 'calc(100% - 40px - 6px)'
  },
  variants: [{
    props: {
      alreadyRendered: true
    },
    style: {
      '@media (prefers-reduced-motion: no-preference)': {
        scrollBehavior: 'smooth'
      }
    }
  }]
}));
const MultiSectionDigitalClockSectionItem = (0, _styles.styled)(_MenuItem.default, {
  name: 'MuiMultiSectionDigitalClockSection',
  slot: 'Item',
  overridesResolver: (_, styles) => styles.item
})(({
  theme
}) => ({
  padding: 8,
  margin: '2px 4px',
  width: _dimensions.MULTI_SECTION_CLOCK_SECTION_WIDTH,
  justifyContent: 'center',
  '&:first-of-type': {
    marginTop: 4
  },
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, _styles.alpha)(theme.palette.primary.main, theme.palette.action.hoverOpacity)
  },
  '&.Mui-selected': {
    backgroundColor: (theme.vars || theme).palette.primary.main,
    color: (theme.vars || theme).palette.primary.contrastText,
    '&:focus-visible, &:hover': {
      backgroundColor: (theme.vars || theme).palette.primary.dark
    }
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.focusOpacity})` : (0, _styles.alpha)(theme.palette.primary.main, theme.palette.action.focusOpacity)
  }
}));
/**
 * @ignore - internal component.
 */
const MultiSectionDigitalClockSection = exports.MultiSectionDigitalClockSection = /*#__PURE__*/React.forwardRef(function MultiSectionDigitalClockSection(inProps, ref) {
  const containerRef = React.useRef(null);
  const handleRef = (0, _useForkRef.default)(ref, containerRef);
  const previousActive = React.useRef(null);
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiMultiSectionDigitalClockSection'
  });
  const {
      autoFocus,
      onChange,
      className,
      disabled,
      readOnly,
      items,
      active,
      slots,
      slotProps,
      skipDisabled
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = React.useMemo(() => (0, _extends2.default)({}, props, {
    alreadyRendered: !!containerRef.current
  }), [props]);
  const classes = useUtilityClasses(ownerState);
  const DigitalClockSectionItem = slots?.digitalClockSectionItem ?? MultiSectionDigitalClockSectionItem;
  React.useEffect(() => {
    if (containerRef.current === null) {
      return;
    }
    const activeItem = containerRef.current.querySelector('[role="option"][tabindex="0"], [role="option"][aria-selected="true"]');
    if (active && autoFocus && activeItem) {
      activeItem.focus();
    }
    if (!activeItem || previousActive.current === activeItem) {
      return;
    }
    previousActive.current = activeItem;
    const offsetTop = activeItem.offsetTop;

    // Subtracting the 4px of extra margin intended for the first visible section item
    containerRef.current.scrollTop = offsetTop - 4;
  });
  const focusedOptionIndex = items.findIndex(item => item.isFocused(item.value));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MultiSectionDigitalClockSectionRoot, (0, _extends2.default)({
    ref: handleRef,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    autoFocusItem: autoFocus && active,
    role: "listbox"
  }, other, {
    children: items.map((option, index) => {
      const isItemDisabled = option.isDisabled?.(option.value);
      const isDisabled = disabled || isItemDisabled;
      if (skipDisabled && isDisabled) {
        return null;
      }
      const isSelected = option.isSelected(option.value);
      const tabIndex = focusedOptionIndex === index || focusedOptionIndex === -1 && index === 0 ? 0 : -1;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(DigitalClockSectionItem, (0, _extends2.default)({
        onClick: () => !readOnly && onChange(option.value),
        selected: isSelected,
        disabled: isDisabled,
        disableRipple: readOnly,
        role: "option"
        // aria-readonly is not supported here and does not have any effect
        ,
        "aria-disabled": readOnly || isDisabled || undefined,
        "aria-label": option.ariaLabel,
        "aria-selected": isSelected,
        tabIndex: tabIndex,
        className: classes.item
      }, slotProps?.digitalClockSectionItem, {
        children: option.label
      }), option.label);
    })
  }));
});