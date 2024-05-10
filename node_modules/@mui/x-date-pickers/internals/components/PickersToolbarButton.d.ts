import * as React from 'react';
import { ButtonProps } from '@mui/material/Button';
import { TypographyProps } from '@mui/material/Typography';
import { ExtendMui } from '../models/helpers';
import { PickersToolbarButtonClasses } from './pickersToolbarButtonClasses';
export interface PickersToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
    align?: TypographyProps['align'];
    selected: boolean;
    typographyClassName?: string;
    value: React.ReactNode;
    variant: TypographyProps['variant'];
    classes?: Partial<PickersToolbarButtonClasses>;
    width?: number;
}
export declare const PickersToolbarButton: React.FunctionComponent<PickersToolbarButtonProps>;
