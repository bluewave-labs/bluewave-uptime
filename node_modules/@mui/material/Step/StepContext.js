import * as React from 'react';
/**
 * Provides information about the current step in Stepper.
 */
const StepContext = /*#__PURE__*/React.createContext({});
if (process.env.NODE_ENV !== 'production') {
  StepContext.displayName = 'StepContext';
}

/**
 * Returns the current StepContext or an empty object if no StepContext
 * has been defined in the component tree.
 */
export function useStepContext() {
  return React.useContext(StepContext);
}
export default StepContext;