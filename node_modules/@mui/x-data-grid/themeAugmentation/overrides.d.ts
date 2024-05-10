import { GridClassKey } from '../constants/gridClasses';
export interface DataGridComponentNameToClassKey {
    MuiDataGrid: GridClassKey;
}
declare module '@mui/material/styles' {
    interface ComponentNameToClassKey extends DataGridComponentNameToClassKey {
    }
    interface Mixins {
        MuiDataGrid?: {
            containerBackground?: string;
            pinnedBackground?: string;
        };
    }
}
