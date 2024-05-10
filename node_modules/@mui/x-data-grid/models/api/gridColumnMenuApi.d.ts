/**
 * The column menu API interface that is available in the grid [[apiRef]].
 */
export interface GridColumnMenuApi {
    /**
     * Display the column menu under the `field` column.
     * @param {string} field The column to display the menu.
     */
    showColumnMenu: (field: string) => void;
    /**
     * Hides the column menu that is open.
     */
    hideColumnMenu: () => void;
    /**
     * Toggles the column menu under the `field` column.
     * @param {string} field The field name to toggle the column menu.
     */
    toggleColumnMenu: (field: string) => void;
}
