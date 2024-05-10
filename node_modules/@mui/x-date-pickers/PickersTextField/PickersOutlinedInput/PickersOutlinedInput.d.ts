import * as React from 'react';
import { PickersInputBaseProps } from '../PickersInputBase';
export interface PickersOutlinedInputProps extends PickersInputBaseProps {
    notched?: boolean;
}
/**
 * @ignore - internal component.
 */
declare const PickersOutlinedInput: React.ForwardRefExoticComponent<Omit<PickersOutlinedInputProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { PickersOutlinedInput };
