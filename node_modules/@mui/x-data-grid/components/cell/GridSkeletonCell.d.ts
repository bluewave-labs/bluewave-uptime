import * as React from 'react';
export interface GridSkeletonCellProps {
    width: number;
    height: number | 'auto';
    field: string;
    align: string;
}
declare function GridSkeletonCell(props: React.HTMLAttributes<HTMLDivElement> & GridSkeletonCellProps): React.JSX.Element;
declare namespace GridSkeletonCell {
    var propTypes: any;
}
declare const Memoized: typeof GridSkeletonCell;
export { Memoized as GridSkeletonCell };
