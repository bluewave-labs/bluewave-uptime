import * as React from 'react';
import type { GridPrivateApiCommon } from '../../models/api/gridApiCommon';
export declare const useGridRefs: <PrivateApi extends GridPrivateApiCommon>(apiRef: React.MutableRefObject<PrivateApi>) => void;
