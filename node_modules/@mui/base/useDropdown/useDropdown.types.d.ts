/// <reference types="react" />
import type { DropdownContextValue } from './DropdownContext';
export interface UseDropdownParameters {
    /**
     * If `true`, the dropdown is initially open.
     */
    defaultOpen?: boolean;
    /**
     * Callback fired when the component requests to be opened or closed.
     */
    onOpenChange?: (event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, open: boolean) => void;
    /**
     * Allows to control whether the dropdown is open.
     * This is a controlled counterpart of `defaultOpen`.
     */
    open?: boolean;
    /**
     * The name of the component using useDropdown.
     * For debugging purposes.
     * @default 'useDropdown'
     */
    componentName?: string;
}
export interface UseDropdownReturnValue {
    /**
     * The value to be passed into the DropdownContext provider.
     */
    contextValue: DropdownContextValue;
    /**
     * If `true`, the dropdown is open.
     */
    open: boolean;
}
export declare const DropdownActionTypes: {
    readonly blur: "dropdown:blur";
    readonly escapeKeyDown: "dropdown:escapeKeyDown";
    readonly toggle: "dropdown:toggle";
    readonly open: "dropdown:open";
    readonly close: "dropdown:close";
};
interface DropdownBlurAction {
    type: typeof DropdownActionTypes.blur;
    event: React.FocusEvent;
}
interface DropdownEscapeKeyDownAction {
    type: typeof DropdownActionTypes.escapeKeyDown;
    event: React.KeyboardEvent;
}
interface DropdownToggleAction {
    type: typeof DropdownActionTypes.toggle;
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null;
}
interface DropdownOpenAction {
    type: typeof DropdownActionTypes.open;
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null;
}
interface DropdownCloseAction {
    type: typeof DropdownActionTypes.close;
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null;
}
export type DropdownAction = DropdownBlurAction | DropdownEscapeKeyDownAction | DropdownToggleAction | DropdownOpenAction | DropdownCloseAction;
export type DropdownState = {
    open: boolean;
    changeReason: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null;
};
export {};
