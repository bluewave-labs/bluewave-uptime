import { MuiBaseEvent } from '../muiEvent';
import { GridEventLookup, GridEvents } from './gridEventLookup';
type PublisherArgsNoEvent<E extends GridEvents, T extends {
    params: any;
}> = [E, T['params']];
type PublisherArgsRequiredEvent<E extends GridEvents, T extends {
    params: any;
    event: MuiBaseEvent;
}> = [E, T['params'], T['event']];
type PublisherArgsOptionalEvent<E extends GridEvents, T extends {
    params: any;
    event: MuiBaseEvent;
}> = PublisherArgsRequiredEvent<E, T> | PublisherArgsNoEvent<E, T>;
type PublisherArgsEvent<E extends GridEvents, T extends {
    params: any;
    event: MuiBaseEvent;
}> = {} extends T['event'] ? PublisherArgsOptionalEvent<E, T> : PublisherArgsRequiredEvent<E, T>;
type PublisherArgsParams<E extends GridEvents, T extends {
    params: any;
}> = [E, T['params']];
type PublisherArgsNoParams<E extends GridEvents> = [E];
type GridEventPublisherArg<E extends GridEvents, T> = T extends {
    params: any;
    event: MuiBaseEvent;
} ? PublisherArgsEvent<E, T> : T extends {
    params: any;
} ? PublisherArgsParams<E, T> : PublisherArgsNoParams<E>;
export type GridEventPublisher = <E extends GridEvents>(...params: GridEventPublisherArg<E, GridEventLookup[E]>) => void;
export {};
