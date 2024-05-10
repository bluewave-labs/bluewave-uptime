/**
 * The benefit of this function is to help developers get CSS var from theme without specifying the whole variable
 * and they does not need to remember the prefix (defined once).
 */
export default function createGetCssVar<T extends string = string>(prefix?: string): <AdditionalVars extends string = never>(field: T | AdditionalVars, ...fallbacks: (T | AdditionalVars)[]) => string;
