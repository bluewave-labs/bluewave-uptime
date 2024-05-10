import { FieldValueType } from '../../models';
export declare const splitFieldInternalAndForwardedProps: <TProps extends {}, TInternalPropNames extends keyof TProps>(props: TProps, valueType: FieldValueType) => {
    forwardedProps: Omit<TProps, TInternalPropNames>;
    internalProps: Pick<TProps, TInternalPropNames>;
};
