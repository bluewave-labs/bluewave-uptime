import * as React from 'react';
export type MuiBaseEvent = React.SyntheticEvent<HTMLElement> | DocumentEventMap[keyof DocumentEventMap] | {};
export type MuiEvent<E extends MuiBaseEvent = MuiBaseEvent> = E & {
    defaultMuiPrevented?: boolean;
};
