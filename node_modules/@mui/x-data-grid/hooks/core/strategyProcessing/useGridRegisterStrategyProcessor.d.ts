import * as React from 'react';
import { GridPrivateApiCommon } from '../../../models/api/gridApiCommon';
import { GridStrategyProcessor } from './gridStrategyProcessingApi';
export declare const useGridRegisterStrategyProcessor: <Api extends GridPrivateApiCommon, G extends keyof import("./gridStrategyProcessingApi").GridStrategyProcessingLookup>(apiRef: React.MutableRefObject<Api>, strategyName: string, group: G, processor: GridStrategyProcessor<G>) => void;
