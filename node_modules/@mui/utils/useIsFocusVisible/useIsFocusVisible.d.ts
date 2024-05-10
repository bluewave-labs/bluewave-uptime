import * as React from 'react';
export declare function teardown(doc: Document): void;
export interface UseIsFocusVisibleResult {
    isFocusVisibleRef: React.MutableRefObject<boolean>;
    onBlur: (event: React.FocusEvent<any>) => void;
    onFocus: (event: React.FocusEvent<any>) => void;
    ref: React.RefCallback<Element>;
}
export default function useIsFocusVisible(): UseIsFocusVisibleResult;
