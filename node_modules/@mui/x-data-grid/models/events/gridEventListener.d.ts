import { MuiBaseEvent, MuiEvent } from '../muiEvent';
import { GridCallbackDetails } from '../api/gridCallbackDetails';
import { GridEventLookup, GridEvents } from './gridEventLookup';
export type GridEventListener<E extends GridEvents> = (params: GridEventLookup[E] extends {
    params: any;
} ? GridEventLookup[E]['params'] : undefined, event: GridEventLookup[E] extends {
    event: MuiBaseEvent;
} ? MuiEvent<GridEventLookup[E]['event']> : MuiEvent<{}>, details: GridCallbackDetails) => void;
