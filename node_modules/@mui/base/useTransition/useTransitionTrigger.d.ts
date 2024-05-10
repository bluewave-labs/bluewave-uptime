import { TransitionContextValue } from './TransitionContext';
/**
 * Allows child elements to be transitioned in and out.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/#hooks)
 *
 * API:
 *
 * - [useTransitionTrigger API](https://mui.com/base-ui/react-transitions/hooks-api/#use-transition-trigger)
 */
export declare function useTransitionTrigger(requestEnter: boolean): UseTransitionTriggerReturnValue;
export type UseTransitionTriggerReturnValue = {
    /**
     * The value of a `TransitionContext` to be placed around children that will be transitioned.
     */
    contextValue: TransitionContextValue;
    /**
     * `true`, if the transitioned element has exited completely (or not entered yet).
     */
    hasExited: boolean;
};
