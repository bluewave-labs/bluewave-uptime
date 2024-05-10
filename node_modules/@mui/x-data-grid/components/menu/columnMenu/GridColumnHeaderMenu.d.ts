import * as React from 'react';
import { GridMenuProps } from '../GridMenu';
export interface GridColumnHeaderMenuProps {
    columnMenuId?: string;
    columnMenuButtonId?: string;
    ContentComponent: React.JSXElementConstructor<any>;
    contentComponentProps?: any;
    field: string;
    open: boolean;
    target: HTMLElement | null;
    onExited?: GridMenuProps['onExited'];
}
declare function GridColumnHeaderMenu({ columnMenuId, columnMenuButtonId, ContentComponent, contentComponentProps, field, open, target, onExited, }: GridColumnHeaderMenuProps): React.JSX.Element | null;
declare namespace GridColumnHeaderMenu {
    var propTypes: any;
}
export { GridColumnHeaderMenu };
