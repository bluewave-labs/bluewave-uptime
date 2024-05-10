/**
 * If `componentProps` is a function, calls it with the provided `ownerState`.
 * Otherwise, just returns `componentProps`.
 */
export declare function resolveComponentProps<TProps, TOwnerState, TSlotState>(componentProps: TProps | ((ownerState: TOwnerState, slotState?: TSlotState) => TProps) | undefined, ownerState: TOwnerState, slotState?: TSlotState): TProps | undefined;
