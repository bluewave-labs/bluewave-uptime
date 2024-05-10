import * as React from 'react';
import { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { PaperProps as MuiPaperProps } from '@mui/material/Paper/Paper';
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions/transition';
import { UsePickerValueActions } from '../hooks/usePicker/usePickerValue.types';
export interface PickersModalDialogSlots {
    /**
     * Custom component for the dialog inside which the views are rendered on mobile.
     * @default PickersModalDialogRoot
     */
    dialog?: React.ElementType<MuiDialogProps>;
    /**
     * Custom component for the paper rendered inside the mobile picker's Dialog.
     * @default Paper from '@mui/material'.
     */
    mobilePaper?: React.JSXElementConstructor<MuiPaperProps>;
    /**
     * Custom component for the mobile dialog [Transition](https://mui.com/material-ui/transitions/).
     * @default Fade from '@mui/material'.
     */
    mobileTransition?: React.JSXElementConstructor<MuiTransitionProps>;
}
export interface PickersModalDialogSlotProps {
    /**
     * Props passed down to the [`Dialog`](https://mui.com/material-ui/api/dialog/) component.
     */
    dialog?: Partial<MuiDialogProps>;
    /**
     * Props passed down to the mobile [Paper](https://mui.com/material-ui/api/paper/) component.
     */
    mobilePaper?: Partial<MuiPaperProps>;
    /**
     * Props passed down to the mobile [Transition](https://mui.com/material-ui/transitions/) component.
     */
    mobileTransition?: Partial<MuiTransitionProps>;
}
export interface PickersModalDialogProps extends UsePickerValueActions {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: PickersModalDialogSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: PickersModalDialogSlotProps;
    open: boolean;
}
export declare function PickersModalDialog(props: React.PropsWithChildren<PickersModalDialogProps>): React.JSX.Element;
