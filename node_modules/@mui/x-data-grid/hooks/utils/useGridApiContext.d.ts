import * as React from 'react';
import { GridApiCommon } from '../../models/api/gridApiCommon';
import { GridApiCommunity } from '../../models/api/gridApiCommunity';
export declare function useGridApiContext<Api extends GridApiCommon = GridApiCommunity>(): React.MutableRefObject<Api>;
