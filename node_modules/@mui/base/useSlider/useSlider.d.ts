import { UseSliderParameters, UseSliderReturnValue } from './useSlider.types';
export declare function valueToPercent(value: number, min: number, max: number): number;
export declare const Identity: (x: any) => any;
/**
 *
 * Demos:
 *
 * - [Slider](https://mui.com/base-ui/react-slider/#hook)
 *
 * API:
 *
 * - [useSlider API](https://mui.com/base-ui/react-slider/hooks-api/#use-slider)
 */
export declare function useSlider(parameters: UseSliderParameters): UseSliderReturnValue;
