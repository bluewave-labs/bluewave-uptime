import * as React from 'react';
import { DialogActionsProps } from '@mui/material/DialogActions';
export type PickersActionBarAction = 'clear' | 'cancel' | 'accept' | 'today';
export interface PickersActionBarProps extends DialogActionsProps {
    /**
     * Ordered array of actions to display.
     * If empty, does not display that action bar.
     * @default `['cancel', 'accept']` for mobile and `[]` for desktop
     */
    actions?: PickersActionBarAction[];
    onAccept: () => void;
    onClear: () => void;
    onCancel: () => void;
    onSetToday: () => void;
}
/**
 * Demos:
 *
 * - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
 * - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
 *
 * API:
 *
 * - [PickersActionBar API](https://mui.com/x/api/date-pickers/pickers-action-bar/)
 */
declare function PickersActionBar(props: PickersActionBarProps): React.JSX.Element | null;
declare namespace PickersActionBar {
    var propTypes: any;
}
export { PickersActionBar };
