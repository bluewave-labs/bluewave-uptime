import * as React from 'react';
import { IconButtonProps } from '@mui/material/IconButton';
import { MenuItemProps } from '@mui/material/MenuItem';
interface GridActionsCellItemCommonProps {
    label: string;
    icon?: React.ReactElement;
    /** from https://mui.com/material-ui/api/button-base/#ButtonBase-prop-component */
    component?: React.ElementType;
}
export type GridActionsCellItemProps = GridActionsCellItemCommonProps & (({
    showInMenu?: false;
    icon: React.ReactElement;
} & Omit<IconButtonProps, 'component'>) | ({
    showInMenu: true;
    /**
     * If false, the menu will not close when this item is clicked.
     * @default true
     */
    closeMenuOnClick?: boolean;
    closeMenu?: () => void;
} & Omit<MenuItemProps, 'component'>));
declare const GridActionsCellItem: React.ForwardRefExoticComponent<(Omit<GridActionsCellItemCommonProps & {
    showInMenu?: false | undefined;
    icon: React.ReactElement;
} & Omit<IconButtonProps, "component">, "ref"> | Omit<GridActionsCellItemCommonProps & {
    showInMenu: true;
    /**
     * If false, the menu will not close when this item is clicked.
     * @default true
     */
    closeMenuOnClick?: boolean | undefined;
    closeMenu?: (() => void) | undefined;
} & Omit<MenuItemProps, "component">, "ref">) & React.RefAttributes<HTMLElement>>;
export { GridActionsCellItem };
