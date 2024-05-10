import * as React from 'react';
interface OutlineProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    notched: boolean;
    shrink: boolean;
    label: React.ReactNode;
    ownerState: any;
}
/**
 * @ignore - internal component.
 */
export default function Outline(props: OutlineProps): React.JSX.Element;
export {};
