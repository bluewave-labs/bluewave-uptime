import * as React from 'react';
import { UseGridColumnHeadersProps } from '../hooks/features/columnHeaders/useGridColumnHeaders';
export interface GridColumnHeadersProps extends React.HTMLAttributes<HTMLDivElement>, UseGridColumnHeadersProps {
    ref?: React.Ref<HTMLDivElement>;
}
declare const MemoizedGridColumnHeaders: React.ForwardRefExoticComponent<Omit<GridColumnHeadersProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { MemoizedGridColumnHeaders as GridColumnHeaders };
