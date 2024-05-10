import * as React from 'react';
type ClassNameConfiguration = {
    /**
     * If `true`, the components within the context will not have built-in classes applied.
     */
    disableDefaultClasses: boolean;
};
export interface ClassNameConfiguratorProps extends Partial<ClassNameConfiguration> {
    children?: React.ReactNode;
}
/**
 * @ignore - internal hook.
 *
 * Wraps the `generateUtilityClass` function and controls how the classes are generated.
 * Currently it only affects whether the classes are applied or not.
 *
 * @returns Function to be called with the `generateUtilityClass` function specific to a component to generate the classes.
 */
export declare function useClassNamesOverride(generateUtilityClass: (slot: string) => string): (slot: string) => string;
/**
 * Allows to configure the components within to not apply any built-in classes.
 */
export declare function ClassNameConfigurator(props: ClassNameConfiguratorProps): React.JSX.Element;
export {};
