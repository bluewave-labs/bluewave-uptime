"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersSectionListSectionSeparator = exports.PickersSectionListSectionContent = exports.PickersSectionListSection = exports.PickersSectionListRoot = exports.PickersSectionList = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/base/utils");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _styles = require("@mui/material/styles");
var _pickersSectionListClasses = require("./pickersSectionListClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["slots", "slotProps", "elements", "sectionListRef"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PickersSectionListRoot = exports.PickersSectionListRoot = (0, _styles.styled)('div', {
  name: 'MuiPickersSectionList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  direction: 'ltr /*! @noflip */',
  outline: 'none'
});
const PickersSectionListSection = exports.PickersSectionListSection = (0, _styles.styled)('span', {
  name: 'MuiPickersSectionList',
  slot: 'Section',
  overridesResolver: (props, styles) => styles.section
})({});
const PickersSectionListSectionSeparator = exports.PickersSectionListSectionSeparator = (0, _styles.styled)('span', {
  name: 'MuiPickersSectionList',
  slot: 'SectionSeparator',
  overridesResolver: (props, styles) => styles.sectionSeparator
})({
  whiteSpace: 'pre'
});
const PickersSectionListSectionContent = exports.PickersSectionListSectionContent = (0, _styles.styled)('span', {
  name: 'MuiPickersSectionList',
  slot: 'SectionContent',
  overridesResolver: (props, styles) => styles.sectionContent
})({
  outline: 'none'
});
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    section: ['section'],
    sectionContent: ['sectionContent']
  };
  return (0, _composeClasses.default)(slots, _pickersSectionListClasses.getPickersSectionListUtilityClass, classes);
};
/**
 * Demos:
 *
 * - [Custom field](https://mui.com/x/react-date-pickers/custom-field/)
 *
 * API:
 *
 * - [PickersSectionList API](https://mui.com/x/api/date-pickers/pickers-section-list/)
 */
function PickersSection(props) {
  const {
    slots,
    slotProps,
    element,
    classes
  } = props;
  const Section = slots?.section ?? PickersSectionListSection;
  const sectionProps = (0, _utils.useSlotProps)({
    elementType: Section,
    externalSlotProps: slotProps?.section,
    externalForwardedProps: element.container,
    className: classes.section,
    ownerState: {}
  });
  const SectionContent = slots?.sectionContent ?? PickersSectionListSectionContent;
  const sectionContentProps = (0, _utils.useSlotProps)({
    elementType: SectionContent,
    externalSlotProps: slotProps?.sectionContent,
    externalForwardedProps: element.content,
    additionalProps: {
      suppressContentEditableWarning: true
    },
    className: classes.sectionContent,
    ownerState: {}
  });
  const SectionSeparator = slots?.sectionSeparator ?? PickersSectionListSectionSeparator;
  const sectionSeparatorBeforeProps = (0, _utils.useSlotProps)({
    elementType: SectionSeparator,
    externalSlotProps: slotProps?.sectionSeparator,
    externalForwardedProps: element.before,
    ownerState: {
      position: 'before'
    }
  });
  const sectionSeparatorAfterProps = (0, _utils.useSlotProps)({
    elementType: SectionSeparator,
    externalSlotProps: slotProps?.sectionSeparator,
    externalForwardedProps: element.after,
    ownerState: {
      position: 'after'
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Section, (0, _extends2.default)({}, sectionProps, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SectionSeparator, (0, _extends2.default)({}, sectionSeparatorBeforeProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(SectionContent, (0, _extends2.default)({}, sectionContentProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(SectionSeparator, (0, _extends2.default)({}, sectionSeparatorAfterProps))]
  }));
}
const PickersSectionList = exports.PickersSectionList = /*#__PURE__*/React.forwardRef(function PickersSectionList(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersSectionList'
  });
  const {
      slots,
      slotProps,
      elements,
      sectionListRef
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const classes = useUtilityClasses(props);
  const rootRef = React.useRef(null);
  const handleRootRef = (0, _useForkRef.default)(ref, rootRef);
  const getRoot = methodName => {
    if (!rootRef.current) {
      throw new Error(`MUI X: Cannot call sectionListRef.${methodName} before the mount of the component.`);
    }
    return rootRef.current;
  };
  React.useImperativeHandle(sectionListRef, () => ({
    getRoot() {
      return getRoot('getRoot');
    },
    getSectionContainer(index) {
      const root = getRoot('getSectionContainer');
      return root.querySelector(`.${_pickersSectionListClasses.pickersSectionListClasses.section}[data-sectionindex="${index}"]`);
    },
    getSectionContent(index) {
      const root = getRoot('getSectionContent');
      return root.querySelector(`.${_pickersSectionListClasses.pickersSectionListClasses.section}[data-sectionindex="${index}"] .${_pickersSectionListClasses.pickersSectionListClasses.sectionContent}`);
    },
    getSectionIndexFromDOMElement(element) {
      const root = getRoot('getSectionIndexFromDOMElement');
      if (element == null || !root.contains(element)) {
        return null;
      }
      let sectionContainer = null;
      if (element.classList.contains(_pickersSectionListClasses.pickersSectionListClasses.section)) {
        sectionContainer = element;
      } else if (element.classList.contains(_pickersSectionListClasses.pickersSectionListClasses.sectionContent)) {
        sectionContainer = element.parentElement;
      }
      if (sectionContainer == null) {
        return null;
      }
      return Number(sectionContainer.dataset.sectionindex);
    }
  }));
  const Root = slots?.root ?? PickersSectionListRoot;
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    externalSlotProps: slotProps?.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRootRef,
      suppressContentEditableWarning: true
    },
    className: classes.root,
    ownerState: {}
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, (0, _extends2.default)({}, rootProps, {
    children: rootProps.contentEditable ? elements.map(({
      content,
      before,
      after
    }) => `${before.children}${content.children}${after.children}`).join('') : /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
      children: elements.map((element, elementIndex) => /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersSection, {
        slots: slots,
        slotProps: slotProps,
        element: element,
        classes: classes
      }, elementIndex))
    })
  }));
});
process.env.NODE_ENV !== "production" ? PickersSectionList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: _propTypes.default.bool.isRequired,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: _propTypes.default.arrayOf(_propTypes.default.shape({
    after: _propTypes.default.object.isRequired,
    before: _propTypes.default.object.isRequired,
    container: _propTypes.default.object.isRequired,
    content: _propTypes.default.object.isRequired
  })).isRequired,
  sectionListRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape({
      getRoot: _propTypes.default.func.isRequired,
      getSectionContainer: _propTypes.default.func.isRequired,
      getSectionContent: _propTypes.default.func.isRequired,
      getSectionIndexFromDOMElement: _propTypes.default.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
   */
  slots: _propTypes.default.object
} : void 0;