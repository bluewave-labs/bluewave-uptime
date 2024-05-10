import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "hasSelected", "isInner", "type", "viewValue"];
import * as React from 'react';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from './shared';
import { getClockPointerUtilityClass } from './clockPointerClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    thumb: ['thumb']
  };
  return composeClasses(slots, getClockPointerUtilityClass, classes);
};
const ClockPointerRoot = styled('div', {
  name: 'MuiClockPointer',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  width: 2,
  backgroundColor: (theme.vars || theme).palette.primary.main,
  position: 'absolute',
  left: 'calc(50% - 1px)',
  bottom: '50%',
  transformOrigin: 'center bottom 0px',
  variants: [{
    props: {
      shouldAnimate: true
    },
    style: {
      transition: theme.transitions.create(['transform', 'height'])
    }
  }]
}));
const ClockPointerThumb = styled('div', {
  name: 'MuiClockPointer',
  slot: 'Thumb',
  overridesResolver: (_, styles) => styles.thumb
})(({
  theme
}) => ({
  width: 4,
  height: 4,
  backgroundColor: (theme.vars || theme).palette.primary.contrastText,
  borderRadius: '50%',
  position: 'absolute',
  top: -21,
  left: `calc(50% - ${CLOCK_HOUR_WIDTH / 2}px)`,
  border: `${(CLOCK_HOUR_WIDTH - 4) / 2}px solid ${(theme.vars || theme).palette.primary.main}`,
  boxSizing: 'content-box',
  variants: [{
    props: {
      hasSelected: true
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main
    }
  }]
}));

/**
 * @ignore - internal component.
 */
export function ClockPointer(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiClockPointer'
  });
  const {
      className,
      isInner,
      type,
      viewValue
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const previousType = React.useRef(type);
  React.useEffect(() => {
    previousType.current = type;
  }, [type]);
  const ownerState = _extends({}, props, {
    shouldAnimate: previousType.current !== type
  });
  const classes = useUtilityClasses(ownerState);
  const getAngleStyle = () => {
    const max = type === 'hours' ? 12 : 60;
    let angle = 360 / max * viewValue;
    if (type === 'hours' && viewValue > 12) {
      angle -= 360; // round up angle to max 360 degrees
    }
    return {
      height: Math.round((isInner ? 0.26 : 0.4) * CLOCK_WIDTH),
      transform: `rotateZ(${angle}deg)`
    };
  };
  return /*#__PURE__*/_jsx(ClockPointerRoot, _extends({
    style: getAngleStyle(),
    className: clsx(className, classes.root),
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/_jsx(ClockPointerThumb, {
      ownerState: ownerState,
      className: classes.thumb
    })
  }));
}