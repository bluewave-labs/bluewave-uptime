import * as React from 'react';
/**
 * A React.useRef() that is initialized lazily with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * @usage
 *   const ref = useLazyRef(sortColumns, columns)
 */
export default function useLazyRef<T, U>(init: (arg?: U) => T, initArg?: U): React.MutableRefObject<T>;
