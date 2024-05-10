import { UseSelectParameters, UseSelectReturnValue } from './useSelect.types';
/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/#hooks)
 *
 * API:
 *
 * - [useSelect API](https://mui.com/base-ui/react-select/hooks-api/#use-select)
 */
declare function useSelect<OptionValue, Multiple extends boolean = false>(props: UseSelectParameters<OptionValue, Multiple>): UseSelectReturnValue<OptionValue, Multiple>;
export { useSelect };
