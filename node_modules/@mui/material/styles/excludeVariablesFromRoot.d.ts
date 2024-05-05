/**
 * @internal These variables should not appear in the :root stylesheet when the `defaultMode="dark"`
 */
declare const excludeVariablesFromRoot: (cssVarPrefix: string) => string[];
export default excludeVariablesFromRoot;
