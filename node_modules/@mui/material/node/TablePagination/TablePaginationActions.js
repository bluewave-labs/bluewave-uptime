"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _RtlProvider = require("@mui/system/RtlProvider");
var _KeyboardArrowLeft = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));
var _KeyboardArrowRight = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _LastPage = _interopRequireDefault(require("../internal/svg-icons/LastPage"));
var _FirstPage = _interopRequireDefault(require("../internal/svg-icons/FirstPage"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["backIconButtonProps", "count", "disabled", "getItemAriaLabel", "nextIconButtonProps", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "slots", "slotProps"];
/**
 * @ignore - internal component.
 */
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, ref) {
  var _slots$firstButton, _slots$lastButton, _slots$nextButton, _slots$previousButton, _slots$firstButtonIco, _slots$lastButtonIcon, _slots$nextButtonIcon, _slots$previousButton2;
  const {
      backIconButtonProps,
      count,
      disabled = false,
      getItemAriaLabel,
      nextIconButtonProps,
      onPageChange,
      page,
      rowsPerPage,
      showFirstButton,
      showLastButton,
      slots = {},
      slotProps = {}
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const isRtl = (0, _RtlProvider.useRtl)();
  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  const FirstButton = (_slots$firstButton = slots.firstButton) != null ? _slots$firstButton : _IconButton.default;
  const LastButton = (_slots$lastButton = slots.lastButton) != null ? _slots$lastButton : _IconButton.default;
  const NextButton = (_slots$nextButton = slots.nextButton) != null ? _slots$nextButton : _IconButton.default;
  const PreviousButton = (_slots$previousButton = slots.previousButton) != null ? _slots$previousButton : _IconButton.default;
  const FirstButtonIcon = (_slots$firstButtonIco = slots.firstButtonIcon) != null ? _slots$firstButtonIco : _FirstPage.default;
  const LastButtonIcon = (_slots$lastButtonIcon = slots.lastButtonIcon) != null ? _slots$lastButtonIcon : _LastPage.default;
  const NextButtonIcon = (_slots$nextButtonIcon = slots.nextButtonIcon) != null ? _slots$nextButtonIcon : _KeyboardArrowRight.default;
  const PreviousButtonIcon = (_slots$previousButton2 = slots.previousButtonIcon) != null ? _slots$previousButton2 : _KeyboardArrowLeft.default;
  const FirstButtonSlot = isRtl ? LastButton : FirstButton;
  const PreviousButtonSlot = isRtl ? NextButton : PreviousButton;
  const NextButtonSlot = isRtl ? PreviousButton : NextButton;
  const LastButtonSlot = isRtl ? FirstButton : LastButton;
  const firstButtonSlotProps = isRtl ? slotProps.lastButton : slotProps.firstButton;
  const previousButtonSlotProps = isRtl ? slotProps.nextButton : slotProps.previousButton;
  const nextButtonSlotProps = isRtl ? slotProps.previousButton : slotProps.nextButton;
  const lastButtonSlotProps = isRtl ? slotProps.firstButton : slotProps.lastButton;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2.default)({
    ref: ref
  }, other, {
    children: [showFirstButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstButtonSlot, (0, _extends2.default)({
      onClick: handleFirstPageButtonClick,
      disabled: disabled || page === 0,
      "aria-label": getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page)
    }, firstButtonSlotProps, {
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LastButtonIcon, (0, _extends2.default)({}, slotProps.lastButtonIcon)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstButtonIcon, (0, _extends2.default)({}, slotProps.firstButtonIcon))
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(PreviousButtonSlot, (0, _extends2.default)({
      onClick: handleBackButtonClick,
      disabled: disabled || page === 0,
      color: "inherit",
      "aria-label": getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page)
    }, previousButtonSlotProps != null ? previousButtonSlotProps : backIconButtonProps, {
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(NextButtonIcon, (0, _extends2.default)({}, slotProps.nextButtonIcon)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(PreviousButtonIcon, (0, _extends2.default)({}, slotProps.previousButtonIcon))
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)(NextButtonSlot, (0, _extends2.default)({
      onClick: handleNextButtonClick,
      disabled: disabled || (count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false),
      color: "inherit",
      "aria-label": getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page)
    }, nextButtonSlotProps != null ? nextButtonSlotProps : nextIconButtonProps, {
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(PreviousButtonIcon, (0, _extends2.default)({}, slotProps.previousButtonIcon)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(NextButtonIcon, (0, _extends2.default)({}, slotProps.nextButtonIcon))
    })), showLastButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(LastButtonSlot, (0, _extends2.default)({
      onClick: handleLastPageButtonClick,
      disabled: disabled || page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page)
    }, lastButtonSlotProps, {
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstButtonIcon, (0, _extends2.default)({}, slotProps.firstButtonIcon)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(LastButtonIcon, (0, _extends2.default)({}, slotProps.lastButtonIcon))
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  backIconButtonProps: _propTypes.default.object,
  /**
   * The total number of rows.
   */
  count: _propTypes.default.number.isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: _propTypes.default.func.isRequired,
  /**
   * Props applied to the next arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  nextIconButtonProps: _propTypes.default.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: _propTypes.default.func.isRequired,
  /**
   * The zero-based index of the current page.
   */
  page: _propTypes.default.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: _propTypes.default.number.isRequired,
  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: _propTypes.default.bool.isRequired,
  /**
   * If `true`, show the last-page button.
   */
  showLastButton: _propTypes.default.bool.isRequired,
  /**
   * The props used for each slot inside the TablePaginationActions.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    firstButton: _propTypes.default.object,
    firstButtonIcon: _propTypes.default.object,
    lastButton: _propTypes.default.object,
    lastButtonIcon: _propTypes.default.object,
    nextButton: _propTypes.default.object,
    nextButtonIcon: _propTypes.default.object,
    previousButton: _propTypes.default.object,
    previousButtonIcon: _propTypes.default.object
  }),
  /**
   * The components used for each slot inside the TablePaginationActions.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    firstButton: _propTypes.default.elementType,
    firstButtonIcon: _propTypes.default.elementType,
    lastButton: _propTypes.default.elementType,
    lastButtonIcon: _propTypes.default.elementType,
    nextButton: _propTypes.default.elementType,
    nextButtonIcon: _propTypes.default.elementType,
    previousButton: _propTypes.default.elementType,
    previousButtonIcon: _propTypes.default.elementType
  })
} : void 0;
var _default = exports.default = TablePaginationActions;