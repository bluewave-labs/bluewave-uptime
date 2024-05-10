import { PopperProps as BasePopperProps } from '@mui/base/Popper';
import { SxProps } from '@mui/system';
import * as React from 'react';
import { Theme } from '../styles';
export interface PopperProps extends Omit<BasePopperProps, 'direction'> {
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component?: React.ElementType;
    /**
     * The components used for each slot inside the Popper.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: {
        Root?: React.ElementType;
    };
    /**
     * The props used for each slot inside the Popper.
     * @default {}
     */
    componentsProps?: BasePopperProps['slotProps'];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
}
/**
 *
 * Demos:
 *
 * - [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
 * - [Menu](https://mui.com/material-ui/react-menu/)
 * - [Popper](https://mui.com/material-ui/react-popper/)
 *
 * API:
 *
 * - [Popper API](https://mui.com/material-ui/api/popper/)
 */
declare const Popper: React.ForwardRefExoticComponent<PopperProps & React.RefAttributes<HTMLDivElement>>;
export default Popper;
