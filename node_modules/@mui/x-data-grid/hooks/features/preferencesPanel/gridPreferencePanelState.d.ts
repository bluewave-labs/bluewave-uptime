import { GridPreferencePanelsValue } from './gridPreferencePanelsValue';
export interface GridPreferencePanelState {
    open: boolean;
    panelId?: string;
    labelId?: string;
    /**
     * Tab currently opened.
     * @default GridPreferencePanelsValue.filter
     * TODO v6: Remove the default behavior
     */
    openedPanelValue?: GridPreferencePanelsValue;
}
export type GridPreferencePanelInitialState = GridPreferencePanelState;
