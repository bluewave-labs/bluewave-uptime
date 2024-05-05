'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { emphasize } from '@mui/system/colorManipulator';
import styled from '../styles/styled';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';
import { jsx as _jsx } from "react/jsx-runtime";
var BreadcrumbCollapsedButton = styled(ButtonBase)(function (_ref) {
  var theme = _ref.theme;
  return _extends({
    display: 'flex',
    marginLeft: "calc(".concat(theme.spacing(1), " * 0.5)"),
    marginRight: "calc(".concat(theme.spacing(1), " * 0.5)")
  }, theme.palette.mode === 'light' ? {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700]
  } : {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.grey[100]
  }, {
    borderRadius: 2,
    '&:hover, &:focus': _extends({}, theme.palette.mode === 'light' ? {
      backgroundColor: theme.palette.grey[200]
    } : {
      backgroundColor: theme.palette.grey[600]
    }),
    '&:active': _extends({
      boxShadow: theme.shadows[0]
    }, theme.palette.mode === 'light' ? {
      backgroundColor: emphasize(theme.palette.grey[200], 0.12)
    } : {
      backgroundColor: emphasize(theme.palette.grey[600], 0.12)
    })
  });
});
var BreadcrumbCollapsedIcon = styled(MoreHorizIcon)({
  width: 24,
  height: 16
});

/**
 * @ignore - internal component.
 */
function BreadcrumbCollapsed(props) {
  var _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    otherProps = _objectWithoutProperties(props, ["slots", "slotProps"]);
  var ownerState = props;
  return /*#__PURE__*/_jsx("li", {
    children: /*#__PURE__*/_jsx(BreadcrumbCollapsedButton, _extends({
      focusRipple: true
    }, otherProps, {
      ownerState: ownerState,
      children: /*#__PURE__*/_jsx(BreadcrumbCollapsedIcon, _extends({
        as: slots.CollapsedIcon,
        ownerState: ownerState
      }, slotProps.collapsedIcon))
    }))
  });
}
process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * The props used for the CollapsedIcon slot.
   * @default {}
   */
  slotProps: PropTypes.shape({
    collapsedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the BreadcumbCollapsed.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    CollapsedIcon: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default BreadcrumbCollapsed;