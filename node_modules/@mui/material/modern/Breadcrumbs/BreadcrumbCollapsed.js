'use client';

import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["slots", "slotProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { emphasize } from '@mui/system/colorManipulator';
import styled from '../styles/styled';
import MoreHorizIcon from '../internal/svg-icons/MoreHoriz';
import ButtonBase from '../ButtonBase';
import { jsx as _jsx } from "react/jsx-runtime";
const BreadcrumbCollapsedButton = styled(ButtonBase)(({
  theme
}) => _extends({
  display: 'flex',
  marginLeft: `calc(${theme.spacing(1)} * 0.5)`,
  marginRight: `calc(${theme.spacing(1)} * 0.5)`
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
}));
const BreadcrumbCollapsedIcon = styled(MoreHorizIcon)({
  width: 24,
  height: 16
});

/**
 * @ignore - internal component.
 */
function BreadcrumbCollapsed(props) {
  const {
      slots = {},
      slotProps = {}
    } = props,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = props;
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