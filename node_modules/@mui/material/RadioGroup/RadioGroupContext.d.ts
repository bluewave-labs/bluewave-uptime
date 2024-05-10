import * as React from 'react';
export interface RadioGroupContextValue {
    name: string | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    value: any;
}
/**
 * @ignore - internal component.
 */
declare const RadioGroupContext: React.Context<RadioGroupContextValue | undefined>;
export default RadioGroupContext;
