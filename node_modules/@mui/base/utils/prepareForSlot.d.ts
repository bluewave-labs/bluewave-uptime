import * as React from 'react';
export declare function prepareForSlot<ComponentType extends React.ElementType>(Component: ComponentType): React.ForwardRefExoticComponent<React.PropsWithoutRef<React.ComponentProps<ComponentType>> & React.RefAttributes<HTMLElement>>;
