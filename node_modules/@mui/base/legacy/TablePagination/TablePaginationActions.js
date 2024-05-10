'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _span, _span2, _span3, _span4;
import * as React from 'react';
import { useSlotProps } from '../utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function LastPageIconDefault() {
  return _span || (_span = /*#__PURE__*/_jsx("span", {
    children: '⇾|'
  }));
}
function FirstPageIconDefault() {
  return _span2 || (_span2 = /*#__PURE__*/_jsx("span", {
    children: '|⇽'
  }));
}
function NextPageIconDefault() {
  return _span3 || (_span3 = /*#__PURE__*/_jsx("span", {
    children: '⇾'
  }));
}
function BackPageIconDefault() {
  return _span4 || (_span4 = /*#__PURE__*/_jsx("span", {
    children: '⇽'
  }));
}
function defaultGetAriaLabel(type) {
  return "Go to ".concat(type, " page");
}

/**
 * @ignore - internal component.
 */
var TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, forwardedRef) {
  var _slots$root, _slots$firstButton, _slots$lastButton, _slots$nextButton, _slots$backButton, _slots$lastPageIcon, _slots$firstPageIcon, _slots$nextPageIcon, _slots$backPageIcon;
  var count = props.count,
    _props$getItemAriaLab = props.getItemAriaLabel,
    getItemAriaLabel = _props$getItemAriaLab === void 0 ? defaultGetAriaLabel : _props$getItemAriaLab,
    onPageChange = props.onPageChange,
    page = props.page,
    rowsPerPage = props.rowsPerPage,
    _props$showFirstButto = props.showFirstButton,
    showFirstButton = _props$showFirstButto === void 0 ? false : _props$showFirstButto,
    _props$showLastButton = props.showLastButton,
    showLastButton = _props$showLastButton === void 0 ? false : _props$showLastButton,
    direction = props.direction,
    ownerStateProp = props.ownerState,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["count", "getItemAriaLabel", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "direction", "ownerState", "slotProps", "slots"]);
  var ownerState = props;
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
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: ownerState
  });
  var FirstButton = (_slots$firstButton = slots.firstButton) != null ? _slots$firstButton : 'button';
  var firstButtonProps = useSlotProps({
    elementType: FirstButton,
    externalSlotProps: slotProps.firstButton,
    additionalProps: {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      'aria-label': getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page)
    },
    ownerState: ownerState
  });
  var LastButton = (_slots$lastButton = slots.lastButton) != null ? _slots$lastButton : 'button';
  var lastButtonProps = useSlotProps({
    elementType: LastButton,
    externalSlotProps: slotProps.lastButton,
    additionalProps: {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      'aria-label': getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page)
    },
    ownerState: ownerState
  });
  var NextButton = (_slots$nextButton = slots.nextButton) != null ? _slots$nextButton : 'button';
  var nextButtonProps = useSlotProps({
    elementType: NextButton,
    externalSlotProps: slotProps.nextButton,
    additionalProps: {
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      'aria-label': getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page)
    },
    ownerState: ownerState
  });
  var BackButton = (_slots$backButton = slots.backButton) != null ? _slots$backButton : 'button';
  var backButtonProps = useSlotProps({
    elementType: BackButton,
    externalSlotProps: slotProps.backButton,
    additionalProps: {
      onClick: handleBackButtonClick,
      disabled: page === 0,
      'aria-label': getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page)
    },
    ownerState: ownerState
  });
  var LastPageIcon = (_slots$lastPageIcon = slots.lastPageIcon) != null ? _slots$lastPageIcon : LastPageIconDefault;
  var FirstPageIcon = (_slots$firstPageIcon = slots.firstPageIcon) != null ? _slots$firstPageIcon : FirstPageIconDefault;
  var NextPageIcon = (_slots$nextPageIcon = slots.nextPageIcon) != null ? _slots$nextPageIcon : NextPageIconDefault;
  var BackPageIcon = (_slots$backPageIcon = slots.backPageIcon) != null ? _slots$backPageIcon : BackPageIconDefault;
  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [showFirstButton && /*#__PURE__*/_jsx(FirstButton, _extends({}, firstButtonProps, {
      children: direction === 'rtl' ? /*#__PURE__*/_jsx(LastPageIcon, {}) : /*#__PURE__*/_jsx(FirstPageIcon, {})
    })), /*#__PURE__*/_jsx(BackButton, _extends({}, backButtonProps, {
      children: direction === 'rtl' ? /*#__PURE__*/_jsx(NextPageIcon, {}) : /*#__PURE__*/_jsx(BackPageIcon, {})
    })), /*#__PURE__*/_jsx(NextButton, _extends({}, nextButtonProps, {
      children: direction === 'rtl' ? /*#__PURE__*/_jsx(BackPageIcon, {}) : /*#__PURE__*/_jsx(NextPageIcon, {})
    })), showLastButton && /*#__PURE__*/_jsx(LastButton, _extends({}, lastButtonProps, {
      children: direction === 'rtl' ? /*#__PURE__*/_jsx(FirstPageIcon, {}) : /*#__PURE__*/_jsx(LastPageIcon, {})
    }))]
  }));
});
export { TablePaginationActions };