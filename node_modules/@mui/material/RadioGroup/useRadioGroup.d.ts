import { RadioGroupContextValue } from './RadioGroupContext';
export interface RadioGroupState extends RadioGroupContextValue {
}
export default function useRadioGroup(): RadioGroupState | undefined;
