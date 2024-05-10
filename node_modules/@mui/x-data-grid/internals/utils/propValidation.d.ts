import { DataGridProcessedProps } from '../../models/props/DataGridProps';
export type PropValidator<TProps> = (props: TProps) => string | undefined;
export declare const propValidatorsDataGrid: PropValidator<DataGridProcessedProps>[];
export declare const validateProps: <TProps>(props: TProps, validators: PropValidator<TProps>[]) => void;
export declare const clearWarningsCache: () => void;
