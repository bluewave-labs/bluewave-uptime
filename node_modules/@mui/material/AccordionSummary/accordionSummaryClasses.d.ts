export interface AccordionSummaryClasses {
    /** Styles applied to the root element. */
    root: string;
    /** State class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: string;
    /** State class applied to the ButtonBase root element if the button is keyboard focused. */
    focusVisible: string;
    /** State class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element unless `disableGutters={true}`. */
    gutters: string;
    /**
     * Styles applied to the children wrapper element unless `disableGutters={true}`.
     * @deprecated Combine the [.MuiAccordionSummary-gutters](/material-ui/api/accordion-summary/#AccordionSummary-classes-gutters) and [.MuiAccordionSummary-content](/material-ui/api/accordion-summary/#AccordionSummary-classes-content) classes instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
     */
    contentGutters: string;
    /** Styles applied to the children wrapper element. */
    content: string;
    /** Styles applied to the `expandIcon`'s wrapper element. */
    expandIconWrapper: string;
}
export type AccordionSummaryClassKey = keyof AccordionSummaryClasses;
export declare function getAccordionSummaryUtilityClass(slot: string): string;
declare const accordionSummaryClasses: AccordionSummaryClasses;
export default accordionSummaryClasses;
