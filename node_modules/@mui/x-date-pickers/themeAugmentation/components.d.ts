import { ComponentsProps, ComponentsOverrides } from '@mui/material/styles';

export interface PickerComponents<Theme = unknown> {
  MuiClock?: {
    defaultProps?: ComponentsProps['MuiClock'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiClock'];
  };
  MuiClockNumber?: {
    defaultProps?: ComponentsProps['MuiClockNumber'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiClockNumber'];
  };
  MuiClockPointer?: {
    defaultProps?: ComponentsProps['MuiClockPointer'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiClockPointer'];
  };
  MuiDateCalendar?: {
    defaultProps?: ComponentsProps['MuiDateCalendar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDateCalendar'];
  };
  MuiDateField?: {
    defaultProps?: ComponentsProps['MuiDateField'];
  };
  MuiDatePickerToolbar?: {
    defaultProps?: ComponentsProps['MuiDatePickerToolbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDatePickerToolbar'];
  };
  MuiDateTimeField?: {
    defaultProps?: ComponentsProps['MuiDateTimeField'];
  };
  MuiDateTimePickerTabs?: {
    defaultProps?: ComponentsProps['MuiDateTimePickerTabs'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDateTimePickerTabs'];
  };
  MuiDateTimePickerToolbar?: {
    defaultProps?: ComponentsProps['MuiDateTimePickerToolbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDateTimePickerToolbar'];
  };
  MuiDayCalendar?: {
    defaultProps?: ComponentsProps['MuiDayCalendar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDayCalendar'];
  };
  MuiDayCalendarSkeleton?: {
    defaultProps?: ComponentsProps['MuiDayCalendarSkeleton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDayCalendarSkeleton'];
  };
  MuiDigitalClock?: {
    defaultProps?: ComponentsProps['MuiDigitalClock'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDigitalClock'];
  };
  MuiLocalizationProvider?: {
    defaultProps?: ComponentsProps['MuiLocalizationProvider'];
  };
  MuiMonthCalendar?: {
    defaultProps?: ComponentsProps['MuiMonthCalendar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMonthCalendar'];
  };
  MuiMultiSectionDigitalClock?: {
    defaultProps?: ComponentsProps['MuiMultiSectionDigitalClock'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMultiSectionDigitalClock'];
  };
  MuiMultiSectionDigitalClockSection?: {
    defaultProps?: ComponentsProps['MuiMultiSectionDigitalClockSection'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiMultiSectionDigitalClockSection'];
  };
  MuiPickersArrowSwitcher?: {
    defaultProps?: ComponentsProps['MuiPickersArrowSwitcher'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersArrowSwitcher'];
  };
  MuiPickersCalendarHeader?: {
    defaultProps?: ComponentsProps['MuiPickersCalendarHeader'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersCalendarHeader'];
  };
  MuiPickersDay?: {
    defaultProps?: ComponentsProps['MuiPickersDay'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersDay'];
  };
  MuiPickersFadeTransitionGroup?: {
    defaultProps?: ComponentsProps['MuiPickersFadeTransitionGroup'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersFadeTransitionGroup'];
  };
  MuiPickersMonth?: {
    defaultProps?: ComponentsProps['MuiPickersMonth'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersMonth'];
  };
  MuiPickersPopper?: {
    defaultProps?: ComponentsProps['MuiPickersPopper'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersPopper'];
  };
  MuiPickersSlideTransition?: {
    defaultProps?: ComponentsProps['MuiPickersSlideTransition'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersSlideTransition'];
  };
  MuiPickersToolbar?: {
    defaultProps?: ComponentsProps['MuiPickersToolbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersToolbar'];
  };
  MuiPickersToolbarButton?: {
    defaultProps?: ComponentsProps['MuiPickersToolbarButton'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersToolbarButton'];
  };
  MuiPickersToolbarText?: {
    defaultProps?: ComponentsProps['MuiPickersToolbarText'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersToolbarText'];
  };
  MuiPickersLayout?: {
    defaultProps?: ComponentsProps['MuiPickersLayout'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersLayout'];
  };
  MuiPickersYear?: {
    defaultProps?: ComponentsProps['MuiPickersYear'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersYear'];
  };
  MuiTimeClock?: {
    defaultProps?: ComponentsProps['MuiTimeClock'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimeClock'];
  };
  MuiTimeField?: {
    defaultProps?: ComponentsProps['MuiTimeField'];
  };
  MuiTimePickerToolbar?: {
    defaultProps?: ComponentsProps['MuiTimePickerToolbar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTimePickerToolbar'];
  };
  MuiYearCalendar?: {
    defaultProps?: ComponentsProps['MuiYearCalendar'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiYearCalendar'];
  };

  // Date Pickers
  MuiDatePicker?: {
    defaultProps?: ComponentsProps['MuiDatePicker'];
  };
  MuiDesktopDatePicker?: {
    defaultProps?: ComponentsProps['MuiDesktopDatePicker'];
  };
  MuiMobileDatePicker?: {
    defaultProps?: ComponentsProps['MuiMobileDatePicker'];
  };
  MuiStaticDatePicker?: {
    defaultProps?: ComponentsProps['MuiStaticDatePicker'];
  };

  // Time Pickers
  MuiTimePicker?: {
    defaultProps?: ComponentsProps['MuiTimePicker'];
  };
  MuiDesktopTimePicker?: {
    defaultProps?: ComponentsProps['MuiDesktopTimePicker'];
  };
  MuiMobileTimePicker?: {
    defaultProps?: ComponentsProps['MuiMobileTimePicker'];
  };
  MuiStaticTimePicker?: {
    defaultProps?: ComponentsProps['MuiStaticTimePicker'];
  };

  // Date Time Pickers
  MuiDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiDateTimePicker'];
  };
  MuiDesktopDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiDesktopDateTimePicker'];
  };
  MuiMobileDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiMobileDateTimePicker'];
  };
  MuiStaticDateTimePicker?: {
    defaultProps?: ComponentsProps['MuiStaticDateTimePicker'];
  };

  // PickersTextField
  MuiPickersTextField?: {
    defaultProps?: ComponentsProps['MuiPickersTextField'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersTextField'];
  };
  MuiPickersInputBase?: {
    defaultProps?: ComponentsProps['MuiPickersInputBase'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersInputBase'];
  };
  MuiPickersInput?: {
    defaultProps?: ComponentsProps['MuiPickersInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersInput'];
  };
  MuiPickersFilledInput?: {
    defaultProps?: ComponentsProps['MuiPickersFilledInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersFilledInput'];
  };
  MuiPickersOutlinedInput?: {
    defaultProps?: ComponentsProps['MuiPickersOutlinedInput'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersOutlinedInput'];
  };
  MuiPickersSectionList?: {
    defaultProps?: ComponentsProps['MuiPickersSectionList'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiPickersSectionList'];
  };
}

declare module '@mui/material/styles' {
  interface Components<Theme = unknown> extends PickerComponents<Theme> {}
}
