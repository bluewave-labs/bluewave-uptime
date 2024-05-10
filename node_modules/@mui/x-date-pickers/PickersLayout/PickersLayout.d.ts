import * as React from 'react';
import { PickersLayoutProps } from './PickersLayout.types';
import { DateOrTimeViewWithMeridiem } from '../internals/models';
import { PickerValidDate } from '../models';
declare const PickersLayoutRoot: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme> & {
    ownerState: {
        isLandscape: boolean;
    };
}, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}>;
export { PickersLayoutRoot };
export declare const PickersLayoutContentWrapper: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}>;
/**
 * Demos:
 *
 * - [Custom layout](https://mui.com/x/react-date-pickers/custom-layout/)
 *
 * API:
 *
 * - [PickersLayout API](https://mui.com/x/api/date-pickers/pickers-layout/)
 */
declare const PickersLayout: {
    <TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem>(inProps: PickersLayoutProps<TValue, TDate, TView>): React.JSX.Element;
    propTypes: any;
};
export { PickersLayout };
