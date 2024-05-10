import * as React from 'react';
import { GridPrivateApiCommon } from '../../../models/api/gridApiCommon';
import { GridPipeProcessor } from './gridPipeProcessingApi';
export declare const useGridRegisterPipeProcessor: <PrivateApi extends GridPrivateApiCommon, G extends keyof import("./gridPipeProcessingApi").GridPipeProcessingLookup>(apiRef: React.MutableRefObject<PrivateApi>, group: G, callback: GridPipeProcessor<G>) => void;
