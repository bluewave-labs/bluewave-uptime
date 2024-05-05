'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["count", "getItemAriaLabel", "onPageChange", "page", "rowsPerPage", "showFirstButton", "showLastButton", "direction", "ownerState", "slotProps", "slots"];
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
  return `Go to ${type} page`;
}

/**
 * @ignore - internal component.
 */
const TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(props, forwardedRef) {
  const {
      count,
      getItemAriaLabel = defaultGetAriaLabel,
      onPageChange,
      page,
      rowsPerPage,
      showFirstButton = false,
      showLastButton = false,
      direction
      // @ts-ignore
      ,

      slotProps = {},
      slots = {}
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = props;
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
  const Root = slots.root ?? 'div';
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState
  });
  const FirstButton = slots.firstButton ?? 'button';
  const firstButtonProps = useSlotProps({
    elementType: FirstButton,
    externalSlotProps: slotProps.firstButton,
    additionalProps: {
      onClick: handleFirstPageButtonClick,
      disabled: page === 0,
      'aria-label': getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page)
    },
    ownerState
  });
  const LastButton = slots.lastButton ?? 'button';
  const lastButtonProps = useSlotProps({
    elementType: LastButton,
    externalSlotProps: slotProps.lastButton,
    additionalProps: {
      onClick: handleLastPageButtonClick,
      disabled: page >= Math.ceil(count / rowsPerPage) - 1,
      'aria-label': getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page)
    },
    ownerState
  });
  const NextButton = slots.nextButton ?? 'button';
  const nextButtonProps = useSlotProps({
    elementType: NextButton,
    externalSlotProps: slotProps.nextButton,
    additionalProps: {
      onClick: handleNextButtonClick,
      disabled: count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false,
      'aria-label': getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page)
    },
    ownerState
  });
  const BackButton = slots.backButton ?? 'button';
  const backButtonProps = useSlotProps({
    elementType: BackButton,
    externalSlotProps: slotProps.backButton,
    additionalProps: {
      onClick: handleBackButtonClick,
      disabled: page === 0,
      'aria-label': getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page)
    },
    ownerState
  });
  const LastPageIcon = slots.lastPageIcon ?? LastPageIconDefault;
  const FirstPageIcon = slots.firstPageIcon ?? FirstPageIconDefault;
  const NextPageIcon = slots.nextPageIcon ?? NextPageIconDefault;
  const BackPageIcon = slots.backPageIcon ?? BackPageIconDefault;
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