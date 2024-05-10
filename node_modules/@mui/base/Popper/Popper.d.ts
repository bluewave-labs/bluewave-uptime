import { PolymorphicComponent } from '../utils';
import { PopperTypeMap } from './Popper.types';
/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v2/) for positioning.
 *
 * Demos:
 *
 * - [Popper](https://mui.com/base-ui/react-popper/)
 *
 * API:
 *
 * - [Popper API](https://mui.com/base-ui/react-popper/components-api/#popper)
 */
declare const Popper: PolymorphicComponent<PopperTypeMap<{}, "div">>;
export { Popper };
