export interface GridColumnsRenderContext {
    firstColumnIndex: number;
    lastColumnIndex: number;
}
export interface GridRenderContext extends GridColumnsRenderContext {
    firstRowIndex: number;
    lastRowIndex: number;
}
export interface GridScrollParams {
    left: number;
    top: number;
    renderContext?: GridRenderContext;
}
export type GridScrollFn = (v: GridScrollParams) => void;
