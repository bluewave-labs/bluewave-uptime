import * as React from 'react';
export interface StepperContextType {
    activeStep: number;
    alternativeLabel: boolean;
    connector: React.ReactNode;
    nonLinear: boolean;
    orientation: 'horizontal' | 'vertical';
}
/**
 * Provides information about the current step in Stepper.
 */
declare const StepperContext: React.Context<{} | StepperContextType>;
/**
 * Returns the current StepperContext or an empty object if no StepperContext
 * has been defined in the component tree.
 */
export declare function useStepperContext(): StepperContextType | {};
export default StepperContext;
