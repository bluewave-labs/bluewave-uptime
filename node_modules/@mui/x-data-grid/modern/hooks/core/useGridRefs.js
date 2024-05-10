import * as React from 'react';
export const useGridRefs = apiRef => {
  const rootElementRef = React.useRef(null);
  const mainElementRef = React.useRef(null);
  const virtualScrollerRef = React.useRef(null);
  apiRef.current.register('public', {
    rootElementRef
  });
  apiRef.current.register('private', {
    mainElementRef,
    virtualScrollerRef
  });
};