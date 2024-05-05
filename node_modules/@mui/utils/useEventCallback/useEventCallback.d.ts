/**
 * Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * See RFC in https://github.com/reactjs/rfcs/pull/220
 */
declare function useEventCallback<Fn extends (...args: any[]) => any = (...args: unknown[]) => unknown>(fn: Fn): Fn;
declare function useEventCallback<Args extends unknown[], Return>(fn: (...args: Args) => Return): (...args: Args) => Return;
export default useEventCallback;
