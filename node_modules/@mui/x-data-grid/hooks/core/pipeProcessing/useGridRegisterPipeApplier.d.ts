import * as React from 'react';
import { GridPrivateApiCommon } from '../../../models/api/gridApiCommon';
export declare const useGridRegisterPipeApplier: <PrivateApi extends GridPrivateApiCommon, G extends keyof import("./gridPipeProcessingApi").GridPipeProcessingLookup>(apiRef: React.MutableRefObject<PrivateApi>, group: G, callback: () => void) => void;
