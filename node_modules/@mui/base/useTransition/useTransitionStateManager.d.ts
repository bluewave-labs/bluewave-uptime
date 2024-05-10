export type UseTransitionStateManagerReturnValue = {
    /**
     * `true`, if the current element should be visible.
     */
    requestedEnter: boolean;
    /**
     * Callback to be called when the element has completely exited.
     */
    onExited: () => void;
};
/**
 * Allows an element to be transitioned in and out.
 * The transition is triggerred by a `TransitionContext` placed above in the component tree.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/#hooks)
 *
 * API:
 *
 * - [useTransitionStateManager API](https://mui.com/base-ui/react-transitions/hooks-api/#use-transition-state-manager)
 */
export declare function useTransitionStateManager(): UseTransitionStateManagerReturnValue;
