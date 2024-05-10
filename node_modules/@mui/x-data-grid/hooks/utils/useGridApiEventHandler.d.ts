import * as React from 'react';
import { GridEventListener, GridEvents } from '../../models/events';
import { CleanupTracking } from '../../utils/cleanupTracking/CleanupTracking';
import { EventListenerOptions } from '../../utils/EventManager';
import type { GridApiCommon } from '../../models';
/**
 * Signal to the underlying logic what version of the public component API
 * of the data grid is exposed.
 */
declare enum GridSignature {
    DataGrid = "DataGrid",
    DataGridPro = "DataGridPro"
}
interface RegistryContainer {
    registry: CleanupTracking | null;
}
export declare function createUseGridApiEventHandler(registryContainer: RegistryContainer): <Api extends GridApiCommon<any, any>, E extends keyof import("../../models").GridEventLookup>(apiRef: React.MutableRefObject<Api>, eventName: E, handler?: GridEventListener<E>, options?: EventListenerOptions) => void;
export declare const unstable_resetCleanupTracking: () => void;
export declare const useGridApiEventHandler: <Api extends GridApiCommon<any, any>, E extends keyof import("../../models").GridEventLookup>(apiRef: React.MutableRefObject<Api>, eventName: E, handler?: GridEventListener<E>, options?: EventListenerOptions) => void;
export declare function useGridApiOptionHandler<Api extends GridApiCommon, E extends GridEvents>(apiRef: React.MutableRefObject<Api>, eventName: E, handler?: GridEventListener<E>): void;
export { GridSignature };
