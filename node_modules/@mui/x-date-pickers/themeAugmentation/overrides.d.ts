import {
  DateCalendarClassKey,
  DayCalendarClassKey,
  PickersFadeTransitionGroupClassKey,
  PickersSlideTransitionClassKey,
} from '../DateCalendar';
import { PickersCalendarHeaderClassKey } from '../PickersCalendarHeader';
import { DayCalendarSkeletonClassKey } from '../DayCalendarSkeleton';
import {
  ClockClassKey,
  ClockNumberClassKey,
  TimeClockClassKey,
  ClockPointerClassKey,
} from '../TimeClock';
import { MonthCalendarClassKey, PickersMonthClassKey } from '../MonthCalendar';
import { PickersDayClassKey } from '../PickersDay';
import { PickersYearClassKey, YearCalendarClassKey } from '../YearCalendar';
import { PickersLayoutClassKey } from '../PickersLayout';
import { DatePickerToolbarClassKey } from '../DatePicker';
import { TimePickerToolbarClassKey } from '../TimePicker';
import { DateTimePickerToolbarClassKey, DateTimePickerTabsClassKey } from '../DateTimePicker';
import { PickersArrowSwitcherClassKey } from '../internals/components/PickersArrowSwitcher';
import { PickersToolbarClassKey } from '../internals/components/pickersToolbarClasses';
import { PickersPopperClassKey } from '../internals/components/pickersPopperClasses';
import { PickersToolbarButtonClassKey } from '../internals/components/pickersToolbarButtonClasses';
import { PickersToolbarTextClassKey } from '../internals/components/pickersToolbarTextClasses';
import { DigitalClockClassKey } from '../DigitalClock';
import {
  MultiSectionDigitalClockClassKey,
  MultiSectionDigitalClockSectionClassKey,
} from '../MultiSectionDigitalClock';
import {
  PickersTextFieldClassKey,
  PickersInputClassKey,
  PickersOutlinedInputClassKey,
  PickersFilledInputClassKey,
  PickersInputBaseClassKey,
} from '../PickersTextField';
import { PickersSectionListClassKey } from '../PickersSectionList';

// prettier-ignore
export interface PickersComponentNameToClassKey {
  MuiClock: ClockClassKey;
  MuiClockNumber: ClockNumberClassKey;
  MuiClockPointer: ClockPointerClassKey;
  MuiDateCalendar: DateCalendarClassKey;
  MuiDatePickerToolbar: DatePickerToolbarClassKey;
  MuiDateTimePickerTabs: DateTimePickerTabsClassKey;
  MuiDateTimePickerToolbar: DateTimePickerToolbarClassKey;
  MuiDayCalendar: DayCalendarClassKey;
  MuiDayCalendarSkeleton: DayCalendarSkeletonClassKey;
  MuiDigitalClock: DigitalClockClassKey;
  MuiMonthCalendar: MonthCalendarClassKey;
  MuiMultiSectionDigitalClock: MultiSectionDigitalClockClassKey;
  MuiMultiSectionDigitalClockSection: MultiSectionDigitalClockSectionClassKey;
  MuiPickersArrowSwitcher: PickersArrowSwitcherClassKey;
  MuiPickersCalendarHeader: PickersCalendarHeaderClassKey;
  MuiPickersDay: PickersDayClassKey;
  MuiPickersFadeTransitionGroup: PickersFadeTransitionGroupClassKey;
  MuiPickersMonth: PickersMonthClassKey;
  MuiPickersPopper: PickersPopperClassKey;
  MuiPickersSlideTransition: PickersSlideTransitionClassKey;
  MuiPickersToolbar: PickersToolbarClassKey;
  MuiPickersToolbarButton: PickersToolbarButtonClassKey;
  MuiPickersToolbarText: PickersToolbarTextClassKey;
  MuiPickersLayout: PickersLayoutClassKey;
  MuiPickersYear: PickersYearClassKey;
  MuiTimeClock: TimeClockClassKey;
  MuiTimePickerToolbar: TimePickerToolbarClassKey;
  MuiYearCalendar: YearCalendarClassKey;

  // V7 Picker's TextField
  MuiPickersTextField: PickersTextFieldClassKey;
  MuiPickersInputBase: PickersInputBaseClassKey
  MuiPickersInput: PickersInputClassKey
  MuiPickersFilledInput: PickersFilledInputClassKey
  MuiPickersOutlinedInput: PickersOutlinedInputClassKey
  MuiPickersSectionList: PickersSectionListClassKey
}

declare module '@mui/material/styles' {
  interface ComponentNameToClassKey extends PickersComponentNameToClassKey {}
}

// disable automatic export
export {};
