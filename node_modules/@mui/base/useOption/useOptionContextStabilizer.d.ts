/**
 * Stabilizes the ListContext value for the Option component, so it doesn't change when sibling Options update.
 *
 * @param value The value of the Option.
 * @returns The stable ListContext value.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useOptionContextStabilizer API](https://mui.com/base-ui/react-select/hooks-api/#use-option-context-stabilizer)
 */
export declare function useOptionContextStabilizer<OptionValue>(value: OptionValue): {
    contextValue: {
        dispatch: (action: import("../useList").ListAction<OptionValue>) => void;
        getItemState: (itemValue: OptionValue) => {
            highlighted: boolean;
            selected: boolean;
            focusable: boolean;
        };
    };
};
