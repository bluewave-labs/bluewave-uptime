import responsivePropType from './responsivePropType';
import style from './style';
import compose from './compose';
import { createUnaryUnit, getValue } from './spacing';
import { handleBreakpoints } from './breakpoints';
export function borderTransform(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return "".concat(value, "px solid");
}
function createBorderStyle(prop, transform) {
  return style({
    prop: prop,
    themeKey: 'borders',
    transform: transform
  });
}
export var border = createBorderStyle('border', borderTransform);
export var borderTop = createBorderStyle('borderTop', borderTransform);
export var borderRight = createBorderStyle('borderRight', borderTransform);
export var borderBottom = createBorderStyle('borderBottom', borderTransform);
export var borderLeft = createBorderStyle('borderLeft', borderTransform);
export var borderColor = createBorderStyle('borderColor');
export var borderTopColor = createBorderStyle('borderTopColor');
export var borderRightColor = createBorderStyle('borderRightColor');
export var borderBottomColor = createBorderStyle('borderBottomColor');
export var borderLeftColor = createBorderStyle('borderLeftColor');
export var outline = createBorderStyle('outline', borderTransform);
export var outlineColor = createBorderStyle('outlineColor');

// false positive
// eslint-disable-next-line react/function-component-definition
export var borderRadius = function borderRadius(props) {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    var transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');
    var styleFromPropValue = function styleFromPropValue(propValue) {
      return {
        borderRadius: getValue(transformer, propValue)
      };
    };
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = process.env.NODE_ENV !== 'production' ? {
  borderRadius: responsivePropType
} : {};
borderRadius.filterProps = ['borderRadius'];
var borders = compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);
export default borders;