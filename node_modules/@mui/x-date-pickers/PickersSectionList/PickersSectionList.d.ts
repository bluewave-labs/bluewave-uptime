import * as React from 'react';
import { PickersSectionListProps } from './PickersSectionList.types';
export declare const PickersSectionListRoot: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}>;
export declare const PickersSectionListSection: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, keyof React.ClassAttributes<HTMLSpanElement> | keyof React.HTMLAttributes<HTMLSpanElement>>, {}>;
export declare const PickersSectionListSectionSeparator: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, keyof React.ClassAttributes<HTMLSpanElement> | keyof React.HTMLAttributes<HTMLSpanElement>>, {}>;
export declare const PickersSectionListSectionContent: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, keyof React.ClassAttributes<HTMLSpanElement> | keyof React.HTMLAttributes<HTMLSpanElement>>, {}>;
type PickersSectionListComponent = ((props: PickersSectionListProps & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
declare const PickersSectionList: PickersSectionListComponent;
export { PickersSectionList };
