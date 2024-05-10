import { DateOrTimeViewWithMeridiem } from '../models';
type Orientation = 'portrait' | 'landscape';
export declare const useIsLandscape: (views: readonly DateOrTimeViewWithMeridiem[], customOrientation: Orientation | undefined) => boolean;
export {};
