import * as React from 'react';
import { GridPrivateApiCommon } from '../../models/api/gridApiCommon';
export declare const useGridNativeEventListener: <PrivateApi extends GridPrivateApiCommon, K extends keyof HTMLElementEventMap>(apiRef: React.MutableRefObject<PrivateApi>, ref: React.MutableRefObject<HTMLDivElement | null> | (() => HTMLElement | undefined | null), eventName: K, handler?: (event: HTMLElementEventMap[K]) => any, options?: AddEventListenerOptions) => void;
