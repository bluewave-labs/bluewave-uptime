import { GridCellIndexCoordinates } from '../gridCell';
import { GridScrollParams } from '../params/gridScrollParams';
/**
 * The scroll API interface that is available in the grid [[apiRef]].
 */
export interface GridScrollApi {
    /**
     * Triggers the viewport to scroll to the given positions (in pixels).
     * @param {GridScrollParams} params An object containing the `left` or `top` position to scroll.
     */
    scroll: (params: Partial<GridScrollParams>) => void;
    /**
     * Returns the current scroll position.
     * @returns {GridScrollParams} The scroll positions.
     */
    getScrollPosition: () => GridScrollParams;
    /**
     * Triggers the viewport to scroll to the cell at indexes given by `params`.
     * Returns `true` if the grid had to scroll to reach the target.
     * @param {GridCellIndexCoordinates} params The indexes where the cell is.
     * @returns {boolean} Returns `true` if the index was outside of the viewport and the grid had to scroll to reach the target.
     */
    scrollToIndexes: (params: Partial<GridCellIndexCoordinates>) => boolean;
}
