import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { styled, useThemeProps } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import { TimeIcon, DateRangeIcon } from '../icons';
import { useLocaleText } from '../internals/hooks/useUtils';
import { getDateTimePickerTabsUtilityClass } from './dateTimePickerTabsClasses';
import { isDatePickerView } from '../internals/utils/date-utils';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const viewToTab = view => {
  if (isDatePickerView(view)) {
    return 'date';
  }
  return 'time';
};
const tabToView = tab => {
  if (tab === 'date') {
    return 'day';
  }
  return 'hours';
};
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getDateTimePickerTabsUtilityClass, classes);
};
const DateTimePickerTabsRoot = styled(Tabs, {
  name: 'MuiDateTimePickerTabs',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  boxShadow: `0 -1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
  '&:last-child': {
    boxShadow: `0 1px 0 0 inset ${(theme.vars || theme).palette.divider}`,
    [`& .${tabsClasses.indicator}`]: {
      bottom: 'auto',
      top: 0
    }
  }
}));

/**
 * Demos:
 *
 * - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
 * - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [DateTimePickerTabs API](https://mui.com/x/api/date-pickers/date-time-picker-tabs/)
 */
const DateTimePickerTabs = function DateTimePickerTabs(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDateTimePickerTabs'
  });
  const {
    dateIcon = /*#__PURE__*/_jsx(DateRangeIcon, {}),
    onViewChange,
    timeIcon = /*#__PURE__*/_jsx(TimeIcon, {}),
    view,
    hidden = typeof window === 'undefined' || window.innerHeight < 667,
    className,
    sx
  } = props;
  const localeText = useLocaleText();
  const classes = useUtilityClasses(props);
  const handleChange = (event, value) => {
    onViewChange(tabToView(value));
  };
  if (hidden) {
    return null;
  }
  return /*#__PURE__*/_jsxs(DateTimePickerTabsRoot, {
    ownerState: props,
    variant: "fullWidth",
    value: viewToTab(view),
    onChange: handleChange,
    className: clsx(className, classes.root),
    sx: sx,
    children: [/*#__PURE__*/_jsx(Tab, {
      value: "date",
      "aria-label": localeText.dateTableLabel,
      icon: /*#__PURE__*/_jsx(React.Fragment, {
        children: dateIcon
      })
    }), /*#__PURE__*/_jsx(Tab, {
      value: "time",
      "aria-label": localeText.timeTableLabel,
      icon: /*#__PURE__*/_jsx(React.Fragment, {
        children: timeIcon
      })
    })]
  });
};
process.env.NODE_ENV !== "production" ? DateTimePickerTabs.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,
  /**
   * Date tab icon.
   * @default DateRange
   */
  dateIcon: PropTypes.node,
  /**
   * Toggles visibility of the tabs allowing view switching.
   * @default `window.innerHeight < 667` for `DesktopDateTimePicker` and `MobileDateTimePicker`, `displayStaticWrapperAs === 'desktop'` for `StaticDateTimePicker`
   */
  hidden: PropTypes.bool,
  /**
   * Callback called when a tab is clicked.
   * @template TView
   * @param {TView} view The view to open
   */
  onViewChange: PropTypes.func.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Time tab icon.
   * @default Time
   */
  timeIcon: PropTypes.node,
  /**
   * Currently visible picker view.
   */
  view: PropTypes.oneOf(['day', 'hours', 'meridiem', 'minutes', 'month', 'seconds', 'year']).isRequired
} : void 0;
export { DateTimePickerTabs };