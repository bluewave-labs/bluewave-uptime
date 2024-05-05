export interface GridClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `container={true}`. */
    container: string;
    /** Styles applied to the root element if `direction="column"`. */
    'direction-xs-column': string;
    /** Styles applied to the root element if `direction="column-reverse"`. */
    'direction-xs-column-reverse': string;
    /** Styles applied to the root element if `direction="row-reverse"`. */
    'direction-xs-row-reverse': string;
    /** Styles applied to the root element if `wrap="nowrap"`. */
    'wrap-xs-nowrap': string;
    /** Styles applied to the root element if `wrap="reverse"`. */
    'wrap-xs-wrap-reverse': string;
}
export type GridClassKey = keyof GridClasses;
export declare function getGridUtilityClass(slot: string): string;
declare const gridClasses: GridClasses;
export default gridClasses;
