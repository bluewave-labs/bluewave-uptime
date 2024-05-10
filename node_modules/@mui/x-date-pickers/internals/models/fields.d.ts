import * as React from 'react';
import type { UseFieldInternalProps } from '../hooks/useField';
import { FieldSection, PickerValidDate } from '../../models';
import type { ExportedUseClearableFieldProps } from '../../hooks/useClearableField';
export interface BaseFieldProps<TValue, TDate extends PickerValidDate, TSection extends FieldSection, TEnableAccessibleFieldDOMStructure extends boolean, TError> extends Omit<UseFieldInternalProps<TValue, TDate, TSection, TEnableAccessibleFieldDOMStructure, TError>, 'format'>, ExportedUseClearableFieldProps {
    className?: string;
    format?: string;
    disabled?: boolean;
    ref?: React.Ref<HTMLDivElement>;
}
