'use client';

import * as React from 'react';
/**
 * @ignore - do not document.
 *
 * Use this function determine the host element correctly on the server (in a SSR context, for example Next.js)
 */
export function useRootElementName(parameters) {
  var _parameters$rootEleme = parameters.rootElementName,
    rootElementNameProp = _parameters$rootEleme === void 0 ? '' : _parameters$rootEleme,
    componentName = parameters.componentName;
  var _React$useState = React.useState(rootElementNameProp.toUpperCase()),
    rootElementName = _React$useState[0],
    setRootElementName = _React$useState[1];
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(function () {
      if (rootElementNameProp && rootElementName !== rootElementNameProp.toUpperCase()) {
        console.error("useRootElementName: the `rootElementName` prop of ".concat(componentName ? "the ".concat(componentName, " component") : 'a component', " expected the '").concat(rootElementNameProp, "' element, but a '").concat(rootElementName.toLowerCase(), "' was rendered instead"), 'This may cause hydration issues in an SSR context, for example in a Next.js app');
      }
    }, [rootElementNameProp, rootElementName, componentName]);
  }
  var updateRootElementName = React.useCallback(function (instance) {
    var _instance$tagName;
    setRootElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : '');
  }, []);
  return [rootElementName, updateRootElementName];
}