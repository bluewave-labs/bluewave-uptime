import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { DateOrTimeViewWithMeridiem } from '../common';
export interface BaseToolbarProps<TValue, TView extends DateOrTimeViewWithMeridiem> extends ExportedBaseToolbarProps {
    isLandscape: boolean;
    onChange: (newValue: TValue) => void;
    value: TValue;
    /**
     * Currently visible picker view.
     */
    view: TView;
    /**
     * Callback called when a toolbar is clicked
     * @template TView
     * @param {TView} view The view to open
     */
    onViewChange: (view: TView) => void;
    /**
     * Available views.
     */
    views: readonly TView[];
    disabled?: boolean;
    readOnly?: boolean;
    titleId?: string;
}
export interface ExportedBaseToolbarProps {
    /**
     * Toolbar date format.
     */
    toolbarFormat?: string;
    /**
     * Toolbar value placeholder—it is displayed when the value is empty.
     * @default "––"
     */
    toolbarPlaceholder?: React.ReactNode;
    className?: string;
    /**
     * If `true`, show the toolbar even in desktop mode.
     * @default `true` for Desktop, `false` for Mobile.
     */
    hidden?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
}
