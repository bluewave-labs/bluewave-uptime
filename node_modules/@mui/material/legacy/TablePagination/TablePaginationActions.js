'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useRtl } from '@mui/system/RtlProvider';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import IconButton from '../IconButton';
import LastPageIconDefault from '../internal/svg-icons/LastPage';
import FirstPageIconDefault from '../internal/svg-icons/FirstPage';

/**
 * @ignore - internal component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, ref) {
  var _slots$firstButton, _slots$lastButton, _slots$nextButton, _slots$previousButton, _slots$firstButtonIco, _slots$lastButtonIcon, _slots$nextButtonIcon, _slots$previousButton2;
  var backIconButtonProps = props.backIconButtonProps,
    count = props.count,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    getItemAriaLabel = props.getItemAriaLabel,
    nextIconButtonProps = props.nextIconButtonProps,
    onPageChange = props.onPageChange,
    page = props.page,
    rowsPerPage = props.rowsPerPage,
    showFirstButton = props.showFirstButton,
    showLastButton = props.showLastButton,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    other = _objectWithoutProperties(props, ["backIconButtonProps", "count", "disabled", "getItemAriaLabel", "nextIconButtonProps", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "slots", "slotProps"]);
  var isRtl = useRtl();
  var handleFirstPageButtonClick = function handleFirstPageButtonClick(event) {
    onPageChange(event, 0);
  };
  var handleBackButtonClick = function handleBackButtonClick(event) {
    onPageChange(event, page - 1);
  };
  var handleNextButtonClick = function handleNextButtonClick(event) {
    onPageChange(event, page + 1);
  };
  var handleLastPageButtonClick = function handleLastPageButtonClick(event) {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  var FirstButton = (_slots$firstButton = slots.firstButton) != null ? _slots$firstButton : IconButton;
  var LastButton = (_slots$lastButton = slots.lastButton) != null ? _slots$lastButton : IconButton;
  var NextButton = (_slots$nextButton = slots.nextButton) != null ? _slots$nextButton : IconButton;
  var PreviousButton = (_slots$previousButton = slots.previousButton) != null ? _slots$previousButton : IconButton;
  var FirstButtonIcon = (_slots$firstButtonIco = slots.firstButtonIcon) != null ? _slots$firstButtonIco : FirstPageIconDefault;
  var LastButtonIcon = (_slots$lastButtonIcon = slots.lastButtonIcon) != null ? _slots$lastButtonIcon : LastPageIconDefault;
  var NextButtonIcon = (_slots$nextButtonIcon = slots.nextButtonIcon) != null ? _slots$nextButtonIcon : KeyboardArrowRight;
  var PreviousButtonIcon = (_slots$previousButton2 = slots.previousButtonIcon) != null ? _slots$previousButton2 : KeyboardArrowLeft;
  var FirstButtonSlot = isRtl ? LastButton : FirstButton;
  var PreviousButtonSlot = isRtl ? NextButton : PreviousButton;
  var NextButtonSlot = isRtl ? PreviousButton : NextButton;
  var LastButtonSlot = isRtl ? FirstButton : LastButton;
  var firstButtonSlotProps = isRtl ? slotProps.lastButton : slotProps.firstButton;
  var previousButtonSlotProps = isRtl ? slotProps.nextButton : slotProps.previousButton;
  var nextButtonSlotProps = isRtl ? slotProps.previousButton : slotProps.nextButton;
  var lastButtonSlotProps = isRtl ? slotProps.firstButton : slotProps.lastButton;
  return /*#__PURE__*/_jsxs("div", _extends({
    ref: ref
  }, other, {
    children: [showFirstButton && /*#__PURE__*/_jsx(FirstButtonSlot, _extends({
      onClick: handleFirstPageButtonClick,
      disabled: disabled || page === 0,
      "aria-label": getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page)
    }, firstButtonSlotProps, {
      children: isRtl ? /*#__PURE__*/_jsx(LastButtonIcon, _extends({}, slotProps.lastButtonIcon)) : /*#__PURE__*/_jsx(FirstButtonIcon, _extends({}, slotProps.firstButtonIcon))
    })), /*#__PURE__*/_jsx(PreviousButtonSlot, _extends({
      onClick: handleBackButtonClick,
      disabled: disabled || page === 0,
      color: "inherit",
      "aria-label": getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page)
    }, previousButtonSlotProps != null ? previousButtonSlotProps : backIconButtonProps, {
      children: isRtl ? /*#__PURE__*/_jsx(NextButtonIcon, _extends({}, slotProps.nextButtonIcon)) : /*#__PURE__*/_jsx(PreviousButtonIcon, _extends({}, slotProps.previousButtonIcon))
    })), /*#__PURE__*/_jsx(NextButtonSlot, _extends({
      onClick: handleNextButtonClick,
      disabled: disabled || (count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false),
      color: "inherit",
      "aria-label": getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page)
    }, nextButtonSlotProps != null ? nextButtonSlotProps : nextIconButtonProps, {
      children: isRtl ? /*#__PURE__*/_jsx(PreviousButtonIcon, _extends({}, slotProps.previousButtonIcon)) : /*#__PURE__*/_jsx(NextButtonIcon, _extends({}, slotProps.nextButtonIcon))
    })), showLastButton && /*#__PURE__*/_jsx(LastButtonSlot, _extends({
      onClick: handleLastPageButtonClick,
      disabled: disabled || page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page)
    }, lastButtonSlotProps, {
      children: isRtl ? /*#__PURE__*/_jsx(FirstButtonIcon, _extends({}, slotProps.firstButtonIcon)) : /*#__PURE__*/_jsx(LastButtonIcon, _extends({}, slotProps.lastButtonIcon))
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? TablePaginationActions.propTypes = {
  /**
   * Props applied to the back arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * The total number of rows.
   */
  count: PropTypes.number.isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func.isRequired,
  /**
   * Props applied to the next arrow [`IconButton`](/material-ui/api/icon-button/) element.
   */
  nextIconButtonProps: PropTypes.object,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onPageChange: PropTypes.func.isRequired,
  /**
   * The zero-based index of the current page.
   */
  page: PropTypes.number.isRequired,
  /**
   * The number of rows per page.
   */
  rowsPerPage: PropTypes.number.isRequired,
  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: PropTypes.bool.isRequired,
  /**
   * If `true`, show the last-page button.
   */
  showLastButton: PropTypes.bool.isRequired,
  /**
   * The props used for each slot inside the TablePaginationActions.
   * @default {}
   */
  slotProps: PropTypes.shape({
    firstButton: PropTypes.object,
    firstButtonIcon: PropTypes.object,
    lastButton: PropTypes.object,
    lastButtonIcon: PropTypes.object,
    nextButton: PropTypes.object,
    nextButtonIcon: PropTypes.object,
    previousButton: PropTypes.object,
    previousButtonIcon: PropTypes.object
  }),
  /**
   * The components used for each slot inside the TablePaginationActions.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    firstButton: PropTypes.elementType,
    firstButtonIcon: PropTypes.elementType,
    lastButton: PropTypes.elementType,
    lastButtonIcon: PropTypes.elementType,
    nextButton: PropTypes.elementType,
    nextButtonIcon: PropTypes.elementType,
    previousButton: PropTypes.elementType,
    previousButtonIcon: PropTypes.elementType
  })
} : void 0;
export default TablePaginationActions;