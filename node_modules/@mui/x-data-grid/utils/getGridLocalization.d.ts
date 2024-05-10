import { Localization as CoreLocalization } from '@mui/material/locale';
import type { GridLocaleText } from '../models/api/gridLocaleTextApi';
export interface Localization {
    components: {
        MuiDataGrid: {
            defaultProps: {
                localeText: Partial<GridLocaleText>;
            };
        };
    };
}
export declare const getGridLocalization: (gridTranslations: Partial<GridLocaleText>, coreTranslations?: CoreLocalization) => Localization;
