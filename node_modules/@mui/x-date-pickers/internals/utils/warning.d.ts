export declare const buildDeprecatedPropsWarning: (message: string | string[]) => (deprecatedProps: {
    [key: string]: any;
}) => void;
export declare const buildWarning: (message: string | string[], gravity?: 'warning' | 'error') => () => void;
