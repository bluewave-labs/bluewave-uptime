export type GlobalStateSlot = keyof typeof globalStateClasses;
export declare const globalStateClasses: {
    active: string;
    checked: string;
    completed: string;
    disabled: string;
    error: string;
    expanded: string;
    focused: string;
    focusVisible: string;
    open: string;
    readOnly: string;
    required: string;
    selected: string;
};
export default function generateUtilityClass(componentName: string, slot: string, globalStatePrefix?: string): string;
export declare function isGlobalState(slot: string): boolean;
