import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className", "label", "notched", "shrink"];
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { jsx as _jsx } from "react/jsx-runtime";
const OutlineRoot = styled('fieldset', {
  name: 'MuiPickersOutlinedInput',
  slot: 'NotchedOutline',
  overridesResolver: (props, styles) => styles.notchedOutline
})(({
  theme
}) => {
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    textAlign: 'left',
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: -5,
    left: 0,
    margin: 0,
    padding: '0 8px',
    pointerEvents: 'none',
    borderRadius: 'inherit',
    borderStyle: 'solid',
    borderWidth: 1,
    overflow: 'hidden',
    minWidth: '0%',
    borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
  };
});
const OutlineLabel = styled('span')(({
  theme
}) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: 'inherit'
}));
const OutlineLegend = styled('legend')(({
  theme
}) => ({
  float: 'unset',
  // Fix conflict with bootstrap
  width: 'auto',
  // Fix conflict with bootstrap
  overflow: 'hidden',
  // Fix Horizontal scroll when label too long
  variants: [{
    props: {
      withLabel: false
    },
    style: {
      padding: 0,
      lineHeight: '11px',
      // sync with `height` in `legend` styles
      transition: theme.transitions.create('width', {
        duration: 150,
        easing: theme.transitions.easing.easeOut
      })
    }
  }, {
    props: {
      withLabel: true
    },
    style: {
      display: 'block',
      // Fix conflict with normalize.css and sanitize.css
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: '0.75em',
      visibility: 'hidden',
      maxWidth: 0.01,
      transition: theme.transitions.create('max-width', {
        duration: 50,
        easing: theme.transitions.easing.easeOut
      }),
      whiteSpace: 'nowrap',
      '& > span': {
        paddingLeft: 5,
        paddingRight: 5,
        display: 'inline-block',
        opacity: 0,
        visibility: 'visible'
      }
    }
  }, {
    props: {
      withLabel: true,
      notched: true
    },
    style: {
      maxWidth: '100%',
      transition: theme.transitions.create('max-width', {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50
      })
    }
  }]
}));

/**
 * @ignore - internal component.
 */
export default function Outline(props) {
  const {
      className,
      label
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const withLabel = label != null && label !== '';
  const ownerState = _extends({}, props, {
    withLabel
  });
  return /*#__PURE__*/_jsx(OutlineRoot, _extends({
    "aria-hidden": true,
    className: className
  }, other, {
    ownerState: ownerState,
    children: /*#__PURE__*/_jsx(OutlineLegend, {
      ownerState: ownerState,
      children: withLabel ? /*#__PURE__*/_jsx(OutlineLabel, {
        children: label
      }) :
      /*#__PURE__*/
      // notranslate needed while Google Translate will not fix zero-width space issue
      _jsx(OutlineLabel, {
        className: "notranslate",
        children: "\u200B"
      })
    })
  }));
}