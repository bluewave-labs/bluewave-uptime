import * as React from 'react';
export function useGridApiMethod(privateApiRef, apiMethods, visibility) {
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    isFirstRender.current = false;
    privateApiRef.current.register(visibility, apiMethods);
  }, [privateApiRef, visibility, apiMethods]);
  if (isFirstRender.current) {
    privateApiRef.current.register(visibility, apiMethods);
  }
}