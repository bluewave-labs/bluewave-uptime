import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';
import MuiPopper, { PopperProps as MuiPopperProps, PopperPlacementType } from '@mui/material/Popper';
import { TrapFocusProps as MuiTrapFocusProps } from '@mui/material/Unstable_TrapFocus';
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions';
import { PickersPopperClasses } from './pickersPopperClasses';
import { UsePickerValueActions } from '../hooks/usePicker/usePickerValue.types';
interface PickersPopperOwnerState extends PickerPopperProps {
    placement: PopperPlacementType;
}
export interface PickersPopperSlots {
    /**
     * Custom component for the paper rendered inside the desktop picker's Popper.
     * @default PickersPopperPaper
     */
    desktopPaper?: React.JSXElementConstructor<MuiPaperProps>;
    /**
     * Custom component for the desktop popper [Transition](https://mui.com/material-ui/transitions/).
     * @default Grow or Fade from '@mui/material' when `reduceAnimations` is `true`.
     */
    desktopTransition?: React.JSXElementConstructor<MuiTransitionProps>;
    /**
     * Custom component for trapping the focus inside the views on desktop.
     * @default FocusTrap from '@mui/base'.
     */
    desktopTrapFocus?: React.JSXElementConstructor<MuiTrapFocusProps>;
    /**
     * Custom component for the popper inside which the views are rendered on desktop.
     * @default Popper from '@mui/material'.
     */
    popper?: React.ElementType<MuiPopperProps>;
}
export interface PickersPopperSlotProps {
    /**
     * Props passed down to the desktop [Paper](https://mui.com/material-ui/api/paper/) component.
     */
    desktopPaper?: SlotComponentProps<typeof MuiPaper, {}, PickersPopperOwnerState>;
    /**
     * Props passed down to the desktop [Transition](https://mui.com/material-ui/transitions/) component.
     */
    desktopTransition?: Partial<MuiTransitionProps>;
    /**
     * Props passed down to the [FocusTrap](https://mui.com/base-ui/react-focus-trap/) component on desktop.
     */
    desktopTrapFocus?: Partial<MuiTrapFocusProps>;
    /**
     * Props passed down to [Popper](https://mui.com/material-ui/api/popper/) component.
     */
    popper?: SlotComponentProps<typeof MuiPopper, {}, PickerPopperProps>;
}
export interface PickerPopperProps extends UsePickerValueActions {
    role: 'tooltip' | 'dialog';
    anchorEl: MuiPopperProps['anchorEl'];
    open: MuiPopperProps['open'];
    placement?: MuiPopperProps['placement'];
    containerRef?: React.Ref<HTMLDivElement>;
    children?: React.ReactNode;
    onBlur?: () => void;
    slots?: PickersPopperSlots;
    slotProps?: PickersPopperSlotProps;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PickersPopperClasses>;
    shouldRestoreFocus?: () => boolean;
    reduceAnimations?: boolean;
}
export declare function PickersPopper(inProps: PickerPopperProps): React.JSX.Element;
export {};
