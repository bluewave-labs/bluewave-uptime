import { SlideDirection } from './PickersSlideTransition';
import { MuiPickersAdapter, PickersTimezone, PickerValidDate } from '../models';
import { DateCalendarDefaultizedProps } from './DateCalendar.types';
interface CalendarState<TDate extends PickerValidDate> {
    currentMonth: TDate;
    focusedDay: TDate | null;
    isMonthSwitchingAnimating: boolean;
    slideDirection: SlideDirection;
}
type ReducerAction<TType, TAdditional = {}> = {
    type: TType;
} & TAdditional;
interface ChangeMonthPayload<TDate extends PickerValidDate> {
    direction: SlideDirection;
    newMonth: TDate;
}
interface ChangeFocusedDayPayload<TDate extends PickerValidDate> {
    focusedDay: TDate | null;
    /**
     * The update does not trigger month switching animation.
     * For example: when selecting month from the month view.
     */
    withoutMonthSwitchingAnimation?: boolean;
}
export declare const createCalendarStateReducer: <TDate extends PickerValidDate>(reduceAnimations: boolean, disableSwitchToMonthOnDayFocus: boolean, utils: MuiPickersAdapter<TDate>) => (state: CalendarState<TDate>, action: ReducerAction<'finishMonthSwitchingAnimation'> | ReducerAction<'changeMonth', ChangeMonthPayload<TDate>> | ReducerAction<'changeFocusedDay', ChangeFocusedDayPayload<TDate>>) => CalendarState<TDate>;
interface UseCalendarStateParams<TDate extends PickerValidDate> extends Pick<DateCalendarDefaultizedProps<TDate>, 'value' | 'referenceDate' | 'disableFuture' | 'disablePast' | 'minDate' | 'maxDate' | 'onMonthChange' | 'reduceAnimations' | 'shouldDisableDate'> {
    disableSwitchToMonthOnDayFocus?: boolean;
    timezone: PickersTimezone;
}
export declare const useCalendarState: <TDate extends PickerValidDate>(params: UseCalendarStateParams<TDate>) => {
    referenceDate: any;
    calendarState: CalendarState<TDate>;
    changeMonth: (newDate: TDate) => void;
    changeFocusedDay: (newFocusedDate: TDate | null, withoutMonthSwitchingAnimation?: boolean) => void;
    isDateDisabled: (day: TDate | null) => boolean;
    onMonthSwitchingAnimationEnd: () => void;
    handleChangeMonth: (payload: ChangeMonthPayload<TDate>) => void;
};
export {};
