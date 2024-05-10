import { enUS as enUSCore } from '@mui/material/locale';
import { getGridLocalization } from '../utils/getGridLocalization';
import { GRID_DEFAULT_LOCALE_TEXT } from '../constants/localeTextConstants';
export const enUS = getGridLocalization(GRID_DEFAULT_LOCALE_TEXT, enUSCore);