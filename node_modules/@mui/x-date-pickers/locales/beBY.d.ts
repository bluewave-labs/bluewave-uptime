import { TimeViewWithMeridiem } from '../internals/models';
export declare const beBY: {
    components: {
        MuiLocalizationProvider: {
            defaultProps: {
                localeText: {
                    previousMonth?: string | undefined;
                    nextMonth?: string | undefined;
                    calendarWeekNumberHeaderLabel?: string | undefined;
                    calendarWeekNumberHeaderText?: string | undefined;
                    calendarWeekNumberAriaLabelText?: ((weekNumber: number) => string) | undefined;
                    calendarWeekNumberText?: ((weekNumber: number) => string) | undefined;
                    openPreviousView?: string | undefined;
                    openNextView?: string | undefined;
                    calendarViewSwitchingButtonAriaLabel?: ((currentView: import("@mui/x-date-pickers/models").DateView) => string) | undefined;
                    start?: string | undefined;
                    end?: string | undefined;
                    startDate?: string | undefined;
                    startTime?: string | undefined;
                    endDate?: string | undefined;
                    endTime?: string | undefined;
                    cancelButtonLabel?: string | undefined;
                    clearButtonLabel?: string | undefined;
                    okButtonLabel?: string | undefined;
                    todayButtonLabel?: string | undefined;
                    clockLabelText?: ((view: import("@mui/x-date-pickers/models").TimeView, time: any, adapter: import("@mui/x-date-pickers/models").MuiPickersAdapter<any, any>) => string) | undefined;
                    hoursClockNumberText?: ((hours: string) => string) | undefined;
                    minutesClockNumberText?: ((minutes: string) => string) | undefined;
                    secondsClockNumberText?: ((seconds: string) => string) | undefined;
                    selectViewText?: ((view: TimeViewWithMeridiem) => string) | undefined;
                    openDatePickerDialogue?: ((date: any, utils: import("@mui/x-date-pickers/models").MuiPickersAdapter<any, any>) => string) | undefined;
                    openTimePickerDialogue?: ((date: any, utils: import("@mui/x-date-pickers/models").MuiPickersAdapter<any, any>) => string) | undefined;
                    fieldClearLabel?: string | undefined;
                    timeTableLabel?: string | undefined;
                    dateTableLabel?: string | undefined;
                    fieldYearPlaceholder?: ((params: {
                        digitAmount: number;
                        format: string;
                    }) => string) | undefined;
                    fieldMonthPlaceholder?: ((params: {
                        contentType: import("@mui/x-date-pickers/models").FieldSectionContentType;
                        format: string;
                    }) => string) | undefined;
                    fieldDayPlaceholder?: ((params: {
                        format: string;
                    }) => string) | undefined;
                    fieldWeekDayPlaceholder?: ((params: {
                        contentType: import("@mui/x-date-pickers/models").FieldSectionContentType;
                        format: string;
                    }) => string) | undefined;
                    fieldHoursPlaceholder?: ((params: {
                        format: string;
                    }) => string) | undefined;
                    fieldMinutesPlaceholder?: ((params: {
                        format: string;
                    }) => string) | undefined;
                    fieldSecondsPlaceholder?: ((params: {
                        format: string;
                    }) => string) | undefined;
                    fieldMeridiemPlaceholder?: ((params: {
                        format: string;
                    }) => string) | undefined;
                    year?: string | undefined;
                    month?: string | undefined;
                    day?: string | undefined;
                    weekDay?: string | undefined;
                    hours?: string | undefined;
                    minutes?: string | undefined;
                    seconds?: string | undefined;
                    meridiem?: string | undefined;
                    empty?: string | undefined;
                    datePickerToolbarTitle?: string | undefined;
                    timePickerToolbarTitle?: string | undefined;
                    dateTimePickerToolbarTitle?: string | undefined;
                    dateRangePickerToolbarTitle?: string | undefined;
                };
            };
        };
    };
};
