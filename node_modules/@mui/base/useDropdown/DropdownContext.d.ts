import * as React from 'react';
import { DropdownAction, DropdownState } from './useDropdown.types';
export interface DropdownContextValue {
    dispatch: React.Dispatch<DropdownAction>;
    popupId: string;
    registerPopup: (popupId: string) => void;
    registerTrigger: (element: HTMLElement | null) => void;
    state: DropdownState;
    triggerElement: HTMLElement | null;
}
declare const DropdownContext: React.Context<DropdownContextValue | null>;
export { DropdownContext };
