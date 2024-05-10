import type { DropdownContextValue } from './DropdownContext';
import { UseDropdownParameters } from './useDropdown.types';
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/#hooks)
 *
 * API:
 *
 * - [useDropdown API](https://mui.com/base-ui/react-menu/hooks-api/#use-dropdown)
 */
export declare function useDropdown(parameters?: UseDropdownParameters): {
    contextValue: DropdownContextValue;
    open: boolean;
};
