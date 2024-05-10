import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const columnMenuStateInitializer: GridStateInitializer;
/**
 * @requires useGridColumnResize (event)
 * @requires useGridInfiniteLoader (event)
 */
export declare const useGridColumnMenu: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>) => void;
