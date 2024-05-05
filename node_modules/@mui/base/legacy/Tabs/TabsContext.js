import * as React from 'react';
/**
 * @ignore - internal component.
 */
var TabsContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  TabsContext.displayName = 'TabsContext';
}
export function useTabsContext() {
  var context = React.useContext(TabsContext);
  if (context == null) {
    throw new Error('No TabsContext provided');
  }
  return context;
}
export { TabsContext };