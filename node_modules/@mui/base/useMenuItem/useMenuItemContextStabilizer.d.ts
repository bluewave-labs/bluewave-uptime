/**
 * Stabilizes the ListContext value for the MenuItem component, so it doesn't change when sibling items update.
 *
 * @param id The id of the MenuItem. If undefined, it will be generated with useId.
 * @returns The stable ListContext value and the id of the MenuItem.
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useMenuItemContextStabilizer API](https://mui.com/base-ui/react-menu/hooks-api/#use-menu-item-context-stabilizer)
 */
export declare function useMenuItemContextStabilizer(id: string | undefined): {
    contextValue: {
        dispatch: (action: import("../useList").ListAction<string>) => void;
        getItemState: (itemValue: string) => {
            highlighted: boolean;
            selected: boolean;
            focusable: boolean;
        };
    };
    id: string | undefined;
};
