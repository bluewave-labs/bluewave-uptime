import * as React from 'react';
import { GridCellIndexCoordinates, GridScrollParams, GridColDef, GridCellCoordinates, GridCellParams, GridEditMode } from '../../../models';
import { GridInitialStateCommunity } from '../../../models/gridStateCommunity';
import { GridExportStateParams, GridRestoreStatePreProcessingContext, GridRestoreStatePreProcessingValue } from '../../features/statePersistence/gridStatePersistenceInterface';
import { GridHydrateColumnsValue, GridPinnedColumnPosition } from '../../features/columns/gridColumnsInterfaces';
import { GridRowEntry, GridRowId } from '../../../models/gridRows';
import { GridHydrateRowsValue } from '../../features/rows/gridRowsInterfaces';
import { GridPreferencePanelsValue } from '../../features/preferencesPanel';
export type GridPipeProcessorGroup = keyof GridPipeProcessingLookup;
export interface GridPipeProcessingLookup {
    columnMenu: {
        value: Array<string>;
        context: GridColDef;
    };
    exportState: {
        value: GridInitialStateCommunity;
        context: GridExportStateParams;
    };
    hydrateColumns: {
        value: GridHydrateColumnsValue;
    };
    hydrateRows: {
        value: GridHydrateRowsValue;
    };
    exportMenu: {
        value: {
            component: React.ReactElement;
            componentName: string;
        }[];
        context: any;
    };
    preferencePanel: {
        value: React.ReactNode;
        context: GridPreferencePanelsValue;
    };
    restoreState: {
        value: GridRestoreStatePreProcessingValue;
        context: GridRestoreStatePreProcessingContext<GridInitialStateCommunity>;
    };
    rowHeight: {
        value: Record<string, number>;
        context: GridRowEntry;
    };
    scrollToIndexes: {
        value: Partial<GridScrollParams>;
        context: Partial<GridCellIndexCoordinates>;
    };
    rowClassName: {
        value: string[];
        context: GridRowId;
    };
    cellClassName: {
        value: string[];
        context: GridCellCoordinates;
    };
    isCellSelected: {
        value: boolean;
        context: GridCellCoordinates;
    };
    canUpdateFocus: {
        value: boolean;
        context: {
            event: MouseEvent | React.KeyboardEvent;
            cell: GridCellParams | null;
        };
    };
    clipboardCopy: {
        value: string;
    };
    canStartEditing: {
        value: boolean;
        context: {
            event: React.KeyboardEvent;
            cellParams: GridCellParams;
            editMode: GridEditMode;
        };
    };
    isColumnPinned: {
        value: GridPinnedColumnPosition | false;
        context: string;
    };
}
export type GridPipeProcessor<P extends GridPipeProcessorGroup> = (value: GridPipeProcessingLookup[P]['value'], context: GridPipeProcessingLookup[P] extends {
    context: any;
} ? GridPipeProcessingLookup[P]['context'] : undefined) => GridPipeProcessingLookup[P]['value'];
type GridPipeProcessorsApplierArgs<P extends GridPipeProcessorGroup, T extends {
    value: any;
}> = T extends {
    context: any;
} ? [P, T['value'], T['context']] : [P, T['value']];
type GridPipeProcessorsApplier = <P extends GridPipeProcessorGroup>(...params: GridPipeProcessorsApplierArgs<P, GridPipeProcessingLookup[P]>) => GridPipeProcessingLookup[P]['value'];
export interface GridPipeProcessingApi {
    /**
     * Run all the processors registered for the given group.
     * @template T
     * @param {GridPipeProcessorGroup} group The group from which we want to apply the processors.
     * @param {T['value']} value The initial value to pass to the first processor.
     * @param {T['context]} context Context object that will be passed to each processor.
     * @returns {T['value]} The value after passing through all pre-processors.
     * @ignore - do not document.
     */
    unstable_applyPipeProcessors: GridPipeProcessorsApplier;
}
export interface GridPipeProcessingPrivateApi {
    /**
     * Register a processor and run all the appliers of the group.
     * @param {GridPipeProcessorGroup} group The group on which this processor should be applied.
     * @param {string} id An unique and static identifier of the processor.
     * @param {GridPipeProcessor} processor The processor to register.
     * @returns {() => void} A function to unregister the processor.
     */
    registerPipeProcessor: <G extends GridPipeProcessorGroup>(group: GridPipeProcessorGroup, id: string, processor: GridPipeProcessor<G>) => () => void;
    /**
     * Register an applier.
     * @param {GridPipeProcessorGroup} group The group of this applier
     * @param {string} id An unique and static identifier of the applier.
     * @param {() => void} applier The applier to register.
     * @returns {() => void} A function to unregister the applier.
     */
    registerPipeApplier: (group: GridPipeProcessorGroup, id: string, applier: () => void) => () => void;
    /**
     * Imperatively run all the appliers of a group.
     * Most of the time, the applier should run because a processor is re-registered,
     * but sometimes we want to re-apply the processing even if the processor deps have not changed.
     * This may occur when the change requires a `isDeepEqual` check.
     * @param {GridPipeProcessorGroup} group The group to apply.
     */
    requestPipeProcessorsApplication: (group: GridPipeProcessorGroup) => void;
}
export {};
