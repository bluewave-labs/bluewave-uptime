import * as React from 'react';
import { PickersInputBaseProps } from '../PickersInputBase';
export interface PickersFilledInputProps extends PickersInputBaseProps {
    disableUnderline?: boolean;
    hiddenLabel?: boolean;
}
/**
 * @ignore - internal component.
 */
declare const PickersFilledInput: React.ForwardRefExoticComponent<Omit<PickersFilledInputProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { PickersFilledInput };
