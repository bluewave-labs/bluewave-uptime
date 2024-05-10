/// <reference types="react" />
export declare const NumberInputActionTypes: {
    readonly clamp: "numberInput:clamp";
    readonly inputChange: "numberInput:inputChange";
    readonly increment: "numberInput:increment";
    readonly decrement: "numberInput:decrement";
    readonly decrementToMin: "numberInput:decrementToMin";
    readonly incrementToMax: "numberInput:incrementToMax";
    readonly resetInputValue: "numberInput:resetInputValue";
};
interface NumberInputClampAction {
    type: typeof NumberInputActionTypes.clamp;
    event: React.FocusEvent<HTMLInputElement>;
    inputValue: string;
}
interface NumberInputInputChangeAction {
    type: typeof NumberInputActionTypes.inputChange;
    event: React.ChangeEvent<HTMLInputElement>;
    inputValue: string;
}
interface NumberInputIncrementAction {
    type: typeof NumberInputActionTypes.increment;
    event: React.PointerEvent | React.KeyboardEvent;
    applyMultiplier: boolean;
}
interface NumberInputDecrementAction {
    type: typeof NumberInputActionTypes.decrement;
    event: React.PointerEvent | React.KeyboardEvent;
    applyMultiplier: boolean;
}
interface NumberInputIncrementToMaxAction {
    type: typeof NumberInputActionTypes.incrementToMax;
    event: React.KeyboardEvent;
}
interface NumberInputDecrementToMinAction {
    type: typeof NumberInputActionTypes.decrementToMin;
    event: React.KeyboardEvent;
}
interface NumberInputResetInputValueAction {
    type: typeof NumberInputActionTypes.resetInputValue;
}
export type NumberInputAction = NumberInputClampAction | NumberInputInputChangeAction | NumberInputIncrementAction | NumberInputDecrementAction | NumberInputIncrementToMaxAction | NumberInputDecrementToMinAction | NumberInputResetInputValueAction;
export {};
