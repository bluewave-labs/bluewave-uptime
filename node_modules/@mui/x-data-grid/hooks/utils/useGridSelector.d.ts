import * as React from 'react';
import type { GridApiCommon } from '../../models/api/gridApiCommon';
import { OutputSelector } from '../../utils/createSelector';
import { fastObjectShallowCompare } from '../../utils/fastObjectShallowCompare';
export declare const objectShallowCompare: typeof fastObjectShallowCompare;
export declare const useGridSelector: <Api extends GridApiCommon<any, any>, T>(apiRef: React.MutableRefObject<Api>, selector: ((state: Api['state']) => T) | OutputSelector<Api['state'], T>, equals?: (a: T, b: T) => boolean) => T;
