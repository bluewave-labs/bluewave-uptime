import * as React from 'react';
import { ClassValue } from 'clsx';
import { Simplify } from '@mui/types';
import { EventHandlers } from './types';
export type WithCommonProps<OtherProps> = OtherProps & {
    className?: string;
    style?: React.CSSProperties;
    ref?: React.Ref<any>;
};
export interface MergeSlotPropsParameters<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps> {
    /**
     * A function that returns the internal props of the component.
     * It accepts the event handlers passed into the component by the user
     * and is responsible for calling them where appropriate.
     */
    getSlotProps?: (other: EventHandlers) => WithCommonProps<SlotProps>;
    /**
     * Props provided to the `slotProps.*` of the Base UI component.
     */
    externalSlotProps?: WithCommonProps<ExternalSlotProps>;
    /**
     * Extra props placed on the Base UI component that should be forwarded to the slot.
     * This should usually be used only for the root slot.
     */
    externalForwardedProps?: WithCommonProps<ExternalForwardedProps>;
    /**
     * Additional props to be placed on the slot.
     */
    additionalProps?: WithCommonProps<AdditionalProps>;
    /**
     * Extra class name(s) to be placed on the slot.
     */
    className?: ClassValue | ClassValue[];
}
export type MergeSlotPropsResult<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps> = {
    props: Simplify<SlotProps & ExternalForwardedProps & ExternalSlotProps & AdditionalProps & {
        className?: string;
        style?: React.CSSProperties;
    }>;
    internalRef: React.Ref<any> | undefined;
};
/**
 * Merges the slot component internal props (usually coming from a hook)
 * with the externally provided ones.
 *
 * The merge order is (the latter overrides the former):
 * 1. The internal props (specified as a getter function to work with get*Props hook result)
 * 2. Additional props (specified internally on a Base UI component)
 * 3. External props specified on the owner component. These should only be used on a root slot.
 * 4. External props specified in the `slotProps.*` prop.
 * 5. The `className` prop - combined from all the above.
 * @param parameters
 * @returns
 */
export declare function mergeSlotProps<SlotProps, ExternalForwardedProps extends Record<string, unknown>, ExternalSlotProps extends Record<string, unknown>, AdditionalProps>(parameters: MergeSlotPropsParameters<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps>): MergeSlotPropsResult<SlotProps, ExternalForwardedProps, ExternalSlotProps, AdditionalProps>;
