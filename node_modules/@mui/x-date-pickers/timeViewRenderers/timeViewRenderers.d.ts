import * as React from 'react';
import { TimeClockProps } from '../TimeClock';
import { PickerValidDate, TimeView } from '../models';
import { DigitalClockProps } from '../DigitalClock';
import { BaseClockProps } from '../internals/models/props/clock';
import { MultiSectionDigitalClockProps } from '../MultiSectionDigitalClock';
import { TimeViewWithMeridiem } from '../internals/models';
import type { TimePickerProps } from '../TimePicker/TimePicker.types';
export type TimeViewRendererProps<TView extends TimeViewWithMeridiem, TComponentProps extends BaseClockProps<any, TView>> = Omit<TComponentProps, 'views' | 'openTo' | 'view' | 'onViewChange'> & {
    view: TView;
    onViewChange?: (view: TView) => void;
    views: readonly TView[];
};
export declare const renderTimeViewClock: <TDate extends PickerValidDate>({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, ampmInClock, slots, slotProps, readOnly, disabled, sx, autoFocus, showViewSwitcher, disableIgnoringDatePartForTimeValidation, timezone, }: TimeViewRendererProps<TimeView, TimeClockProps<TDate, TimeView>>) => React.JSX.Element;
export declare const renderDigitalClockTimeView: <TDate extends PickerValidDate>({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, slots, slotProps, readOnly, disabled, sx, autoFocus, disableIgnoringDatePartForTimeValidation, timeSteps, skipDisabled, timezone, }: TimeViewRendererProps<Extract<TimeView, 'hours'>, Omit<DigitalClockProps<TDate>, 'timeStep'> & Pick<TimePickerProps<TDate>, 'timeSteps'>>) => React.JSX.Element;
export declare const renderMultiSectionDigitalClockTimeView: <TDate extends PickerValidDate>({ view, onViewChange, focusedView, onFocusedViewChange, views, value, defaultValue, referenceDate, onChange, className, classes, disableFuture, disablePast, minTime, maxTime, shouldDisableTime, minutesStep, ampm, slots, slotProps, readOnly, disabled, sx, autoFocus, disableIgnoringDatePartForTimeValidation, timeSteps, skipDisabled, timezone, }: TimeViewRendererProps<TimeViewWithMeridiem, MultiSectionDigitalClockProps<TDate>>) => React.JSX.Element;
