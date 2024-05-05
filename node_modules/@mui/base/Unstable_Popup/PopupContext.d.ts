import * as React from 'react';
import { PopupPlacement } from './Popup.types';
export interface PopupContextValue {
    placement: PopupPlacement;
}
export declare const PopupContext: React.Context<PopupContextValue | null>;
