import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import type { DataGridProcessedProps } from '../../../models/props/DataGridProps';
/**
 * @requires useGridCsvExport (method)
 * @requires useGridSelection (method)
 */
export declare const useGridClipboard: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'ignoreValueFormatterDuringExport' | 'onClipboardCopy' | 'clipboardCopyCellDelimiter'>) => void;
