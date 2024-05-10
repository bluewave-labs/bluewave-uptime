import * as React from 'react';
import { PickersInputBaseProps } from '../PickersInputBase';
export interface PickersInputProps extends PickersInputBaseProps {
    disableUnderline?: boolean;
}
/**
 * @ignore - internal component.
 */
declare const PickersInput: React.ForwardRefExoticComponent<Omit<PickersInputProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { PickersInput };
