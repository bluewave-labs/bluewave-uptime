import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
/**
 * The preferences panel API interface that is available in the grid [[apiRef]].
 */
export interface GridPreferencesPanelApi {
    /**
     * Displays the preferences panel. The `newValue` argument controls the content of the panel.
     * @param {GridPreferencePanelsValue} newValue The panel to open. Use `"filters"` or `"columns"`.
     * @param {string} panelId The unique panel id
     * @param {string} labelId The unique button id
     */
    showPreferences: (newValue: GridPreferencePanelsValue, panelId?: string, labelId?: string) => void;
    /**
     * Hides the preferences panel.
     */
    hidePreferences: () => void;
}
