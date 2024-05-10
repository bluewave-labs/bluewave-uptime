import * as React from 'react';
import { TypographyProps } from '@mui/material/Typography';
import { PickersToolbarTextClasses } from './pickersToolbarTextClasses';
export interface ExportedPickersToolbarTextProps extends Omit<TypographyProps, 'classes' | 'variant' | 'align'> {
    classes?: Partial<PickersToolbarTextClasses>;
}
export interface PickersToolbarTextProps extends Omit<TypographyProps, 'classes'>, Pick<ExportedPickersToolbarTextProps, 'classes'> {
    selected?: boolean;
    value: React.ReactNode;
}
export declare const PickersToolbarText: React.ForwardRefExoticComponent<Omit<PickersToolbarTextProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
