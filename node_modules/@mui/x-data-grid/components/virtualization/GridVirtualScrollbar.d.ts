import * as React from 'react';
type Position = 'vertical' | 'horizontal';
type GridVirtualScrollbarProps = {
    position: Position;
};
declare const GridVirtualScrollbar: React.ForwardRefExoticComponent<GridVirtualScrollbarProps & React.RefAttributes<HTMLDivElement>>;
export { GridVirtualScrollbar };
