import * as React from 'react';
import { MultiSectionDigitalClockSectionClasses } from './multiSectionDigitalClockSectionClasses';
import type { MultiSectionDigitalClockOption, MultiSectionDigitalClockSlots, MultiSectionDigitalClockSlotProps } from './MultiSectionDigitalClock.types';
export interface ExportedMultiSectionDigitalClockSectionProps {
    className?: string;
    classes?: Partial<MultiSectionDigitalClockSectionClasses>;
    slots?: MultiSectionDigitalClockSlots;
    slotProps?: MultiSectionDigitalClockSlotProps;
}
export interface MultiSectionDigitalClockSectionProps<TValue> extends ExportedMultiSectionDigitalClockSectionProps {
    autoFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    items: MultiSectionDigitalClockOption<TValue>[];
    onChange: (value: TValue) => void;
    active?: boolean;
    skipDisabled?: boolean;
    role?: string;
}
type MultiSectionDigitalClockSectionComponent = <TValue>(props: MultiSectionDigitalClockSectionProps<TValue> & React.RefAttributes<HTMLUListElement>) => React.JSX.Element & {
    propTypes?: any;
};
/**
 * @ignore - internal component.
 */
export declare const MultiSectionDigitalClockSection: MultiSectionDigitalClockSectionComponent;
export {};
