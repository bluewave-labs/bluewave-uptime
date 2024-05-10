import * as React from 'react';
/**
 * Provides information about the current step in Stepper.
 */
var StepperContext = /*#__PURE__*/React.createContext({});
if (process.env.NODE_ENV !== 'production') {
  StepperContext.displayName = 'StepperContext';
}

/**
 * Returns the current StepperContext or an empty object if no StepperContext
 * has been defined in the component tree.
 */
export function useStepperContext() {
  return React.useContext(StepperContext);
}
export default StepperContext;