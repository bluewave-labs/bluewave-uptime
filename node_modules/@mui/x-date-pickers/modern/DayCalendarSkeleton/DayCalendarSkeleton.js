import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Skeleton from '@mui/material/Skeleton';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { DAY_SIZE, DAY_MARGIN } from '../internals/constants/dimensions';
import { getDayCalendarSkeletonUtilityClass } from './dayCalendarSkeletonClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    week: ['week'],
    daySkeleton: ['daySkeleton']
  };
  return composeClasses(slots, getDayCalendarSkeletonUtilityClass, classes);
};
const DayCalendarSkeletonRoot = styled('div', {
  name: 'MuiDayCalendarSkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  alignSelf: 'start'
});
const DayCalendarSkeletonWeek = styled('div', {
  name: 'MuiDayCalendarSkeleton',
  slot: 'Week',
  overridesResolver: (props, styles) => styles.week
})({
  margin: `${DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center'
});
const DayCalendarSkeletonDay = styled(Skeleton, {
  name: 'MuiDayCalendarSkeleton',
  slot: 'DaySkeleton',
  overridesResolver: (props, styles) => styles.daySkeleton
})({
  margin: `0 ${DAY_MARGIN}px`,
  variants: [{
    props: {
      day: 0
    },
    style: {
      visibility: 'hidden'
    }
  }]
});
DayCalendarSkeletonDay.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ownerState: PropTypes.shape({
    day: PropTypes.number.isRequired
  }).isRequired
};
const monthMap = [[0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0]];

/**
 * Demos:
 *
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 *
 * API:
 *
 * - [CalendarPickerSkeleton API](https://mui.com/x/api/date-pickers/calendar-picker-skeleton/)
 */
function DayCalendarSkeleton(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDayCalendarSkeleton'
  });
  const {
      className
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const classes = useUtilityClasses(other);
  return /*#__PURE__*/_jsx(DayCalendarSkeletonRoot, _extends({
    className: clsx(classes.root, className)
  }, other, {
    children: monthMap.map((week, index) => /*#__PURE__*/_jsx(DayCalendarSkeletonWeek, {
      className: classes.week,
      children: week.map((day, index2) => /*#__PURE__*/_jsx(DayCalendarSkeletonDay, {
        variant: "circular",
        width: DAY_SIZE,
        height: DAY_SIZE,
        className: classes.daySkeleton,
        ownerState: {
          day
        }
      }, index2))
    }, index))
  }));
}
process.env.NODE_ENV !== "production" ? DayCalendarSkeleton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { DayCalendarSkeleton };