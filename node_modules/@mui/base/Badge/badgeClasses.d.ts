export interface BadgeClasses {
    /** Class name applied to the root element. */
    root: string;
    /** Class name applied to the badge `span` element. */
    badge: string;
    /** State class applied to the badge `span` element if `invisible={true}`. */
    invisible: string;
}
export type BadgeClassKey = keyof BadgeClasses;
export declare function getBadgeUtilityClass(slot: string): string;
export declare const badgeClasses: BadgeClasses;
