import { TextFieldProps } from '@mui/material/TextField';
import { UseFieldResponse } from '../hooks/useField';
export declare const convertFieldResponseIntoMuiTextFieldProps: <TFieldResponse extends UseFieldResponse<any, any>>({ enableAccessibleFieldDOMStructure, ...fieldResponse }: TFieldResponse) => TextFieldProps;
