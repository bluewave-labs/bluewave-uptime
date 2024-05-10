import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { GridFilterItem } from '../../../models/gridFilterItem';
import type { GridApiCommon } from '../../../models/api/gridApiCommon';
import type { GridApiCommunity } from '../../../models/api/gridApiCommunity';
export type GridFilterInputValueProps<Api extends GridApiCommon = GridApiCommunity> = {
    item: GridFilterItem;
    applyValue: (value: GridFilterItem) => void;
    apiRef: React.MutableRefObject<Api>;
    focusElementRef?: React.Ref<any>;
} & Pick<TextFieldProps, 'color' | 'error' | 'helperText' | 'size' | 'variant'>;
