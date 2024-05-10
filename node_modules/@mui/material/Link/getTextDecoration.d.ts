import type { Theme } from '../styles';
export declare const colorTransformations: {
    primary: string;
    textPrimary: string;
    secondary: string;
    textSecondary: string;
    error: string;
};
declare const getTextDecoration: <T extends Theme>({ theme, ownerState, }: {
    theme: T;
    ownerState: {
        color: string;
    };
}) => string;
export default getTextDecoration;
