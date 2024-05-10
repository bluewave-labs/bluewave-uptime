export type GridColumnIndex = number;
export type GridCellColSpanInfo = {
    spannedByColSpan: true;
    rightVisibleCellIndex: GridColumnIndex;
    leftVisibleCellIndex: GridColumnIndex;
} | {
    spannedByColSpan: false;
    cellProps: {
        colSpan: number;
        width: number;
    };
};
