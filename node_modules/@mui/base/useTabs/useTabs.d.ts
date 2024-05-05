import * as React from 'react';
import { UseTabsParameters, UseTabsReturnValue } from './useTabs.types';
export interface TabMetadata {
    disabled: boolean;
    id: string | undefined;
    ref: React.RefObject<HTMLElement>;
}
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabs API](https://mui.com/base-ui/react-tabs/hooks-api/#use-tabs)
 */
declare function useTabs(parameters: UseTabsParameters): UseTabsReturnValue;
export { useTabs };
