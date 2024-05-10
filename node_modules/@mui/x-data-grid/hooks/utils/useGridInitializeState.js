import * as React from 'react';
export const useGridInitializeState = (initializer, privateApiRef, props) => {
  const isInitialized = React.useRef(false);
  if (!isInitialized.current) {
    privateApiRef.current.state = initializer(privateApiRef.current.state, props, privateApiRef);
    isInitialized.current = true;
  }
};