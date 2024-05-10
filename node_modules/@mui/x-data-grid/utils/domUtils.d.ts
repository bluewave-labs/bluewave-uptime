/// <reference types="react" />
import { gridClasses } from '../constants/gridClasses';
import type { GridPrivateApiCommunity } from '../models/api/gridApiCommunity';
import type { GridRowId } from '../models/gridRows';
export declare function isOverflown(element: Element): boolean;
export declare function findParentElementFromClassName(elem: Element, className: string): Element | null;
export declare function getGridColumnHeaderElement(root: Element, field: string): HTMLDivElement | null;
export declare function getGridRowElement(root: Element, id: GridRowId): HTMLDivElement | null;
export declare function getGridCellElement(root: Element, { id, field }: {
    id: GridRowId;
    field: string;
}): HTMLDivElement | null;
export declare const getActiveElement: (root?: Document | ShadowRoot) => Element | null;
export declare function isEventTargetInPortal(event: React.SyntheticEvent): boolean;
export declare function getFieldFromHeaderElem(colCellEl: Element): string;
export declare function findHeaderElementFromField(elem: Element, field: string): HTMLDivElement;
export declare function getFieldsFromGroupHeaderElem(colCellEl: Element): string[];
export declare function findGroupHeaderElementsFromField(elem: Element, field: string): Element[];
export declare function findGridCellElementsFromCol(col: HTMLElement, api: GridPrivateApiCommunity): Element[];
export declare function findGridElement(api: GridPrivateApiCommunity, klass: keyof typeof gridClasses): HTMLElement;
export declare function findLeftPinnedCellsAfterCol(api: GridPrivateApiCommunity, col: HTMLElement): HTMLElement[];
export declare function findRightPinnedCellsBeforeCol(api: GridPrivateApiCommunity, col: HTMLElement): HTMLElement[];
export declare function findLeftPinnedHeadersAfterCol(api: GridPrivateApiCommunity, col: HTMLElement): HTMLElement[];
export declare function findRightPinnedHeadersBeforeCol(api: GridPrivateApiCommunity, col: HTMLElement): HTMLElement[];
export declare function findGridHeader(api: GridPrivateApiCommunity, field: string): Element | null;
export declare function findGridCells(api: GridPrivateApiCommunity, field: string): Element[];
