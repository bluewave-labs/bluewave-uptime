import * as React from 'react';
export interface GridColumnHeaderTitleProps {
    label: string;
    columnWidth: number;
    description?: React.ReactNode;
}
declare function GridColumnHeaderTitle(props: GridColumnHeaderTitleProps): React.JSX.Element;
declare namespace GridColumnHeaderTitle {
    var propTypes: any;
}
export { GridColumnHeaderTitle };
