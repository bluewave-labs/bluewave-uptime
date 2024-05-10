import * as React from 'react';
import { GridPrivateApiCommon } from '../../models/api/gridApiCommon';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
export declare const useGridLoggerFactory: (apiRef: React.MutableRefObject<GridPrivateApiCommon>, props: Pick<DataGridProcessedProps, 'logger' | 'logLevel'>) => void;
