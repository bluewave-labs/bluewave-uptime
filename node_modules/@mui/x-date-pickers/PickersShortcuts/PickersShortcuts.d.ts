import * as React from 'react';
import { ListProps } from '@mui/material/List';
interface PickersShortcutsItemGetValueParams<TValue> {
    isValid: (value: TValue) => boolean;
}
export interface PickersShortcutsItem<TValue> {
    label: string;
    getValue: (params: PickersShortcutsItemGetValueParams<TValue>) => TValue;
}
export type PickersShortcutsItemContext = Omit<PickersShortcutsItem<unknown>, 'getValue'>;
export type PickerShortcutChangeImportance = 'set' | 'accept';
export interface ExportedPickersShortcutProps<TValue> extends Omit<ListProps, 'onChange'> {
    /**
     * Ordered array of shortcuts to display.
     * If empty, does not display the shortcuts.
     * @default []
     */
    items?: PickersShortcutsItem<TValue>[];
    /**
     * Importance of the change when picking a shortcut:
     * - "accept": fires `onChange`, fires `onAccept` and closes the picker.
     * - "set": fires `onChange` but do not fire `onAccept` and does not close the picker.
     * @default "accept"
     */
    changeImportance?: PickerShortcutChangeImportance;
}
export interface PickersShortcutsProps<TValue> extends ExportedPickersShortcutProps<TValue> {
    isLandscape: boolean;
    onChange: (newValue: TValue, changeImportance: PickerShortcutChangeImportance, shortcut: PickersShortcutsItemContext) => void;
    isValid: (value: TValue) => boolean;
}
/**
 * Demos:
 *
 * - [Shortcuts](https://mui.com/x/react-date-pickers/shortcuts/)
 *
 * API:
 *
 * - [PickersShortcuts API](https://mui.com/x/api/date-pickers/pickers-shortcuts/)
 */
declare function PickersShortcuts<TValue>(props: PickersShortcutsProps<TValue>): React.JSX.Element | null;
declare namespace PickersShortcuts {
    var propTypes: any;
}
export { PickersShortcuts };
