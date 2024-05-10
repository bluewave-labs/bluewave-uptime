import * as React from 'react';
/**
 * @ignore - internal component.
 */
const TabsContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== 'production') {
  TabsContext.displayName = 'TabsContext';
}
export function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (context == null) {
    throw new Error('No TabsContext provided');
  }
  return context;
}
export { TabsContext };