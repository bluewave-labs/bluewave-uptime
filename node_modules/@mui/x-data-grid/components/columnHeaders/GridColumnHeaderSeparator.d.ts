import * as React from 'react';
declare enum GridColumnHeaderSeparatorSides {
    Left = "left",
    Right = "right"
}
export interface GridColumnHeaderSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    resizable: boolean;
    resizing: boolean;
    height: number;
    side?: GridColumnHeaderSeparatorSides;
}
declare function GridColumnHeaderSeparatorRaw(props: GridColumnHeaderSeparatorProps): React.JSX.Element;
declare namespace GridColumnHeaderSeparatorRaw {
    var propTypes: any;
}
declare const GridColumnHeaderSeparator: React.MemoExoticComponent<typeof GridColumnHeaderSeparatorRaw>;
export { GridColumnHeaderSeparator, GridColumnHeaderSeparatorSides };
