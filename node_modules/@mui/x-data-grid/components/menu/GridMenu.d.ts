import * as React from 'react';
import { GrowProps } from '@mui/material/Grow';
import { PopperProps } from '@mui/material/Popper';
type MenuPosition = 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top' | undefined;
export interface GridMenuProps extends Omit<PopperProps, 'onKeyDown' | 'children'> {
    open: boolean;
    target: HTMLElement | null;
    onClose: (event?: Event) => void;
    position?: MenuPosition;
    onExited?: GrowProps['onExited'];
    children: React.ReactNode;
}
declare function GridMenu(props: GridMenuProps): React.JSX.Element;
declare namespace GridMenu {
    var propTypes: any;
}
export { GridMenu };
