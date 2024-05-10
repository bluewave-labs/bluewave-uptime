import * as React from 'react';
export interface StepContextType {
    index: number;
    last: boolean;
    expanded: boolean;
    icon: React.ReactNode;
    active: boolean;
    completed: boolean;
    disabled: boolean;
}
/**
 * Provides information about the current step in Stepper.
 */
declare const StepContext: React.Context<{} | StepContextType>;
/**
 * Returns the current StepContext or an empty object if no StepContext
 * has been defined in the component tree.
 */
export declare function useStepContext(): StepContextType | {};
export default StepContext;
