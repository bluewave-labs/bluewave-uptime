import * as React from 'react';
import { GridApiCommon } from '../../models';
import { GridApiCommunity } from '../../models/api/gridApiCommunity';
/**
 * Hook that instantiate a [[GridApiRef]].
 */
export declare const useGridApiRef: <Api extends GridApiCommon<any, any> = GridApiCommunity>() => React.MutableRefObject<Api>;
