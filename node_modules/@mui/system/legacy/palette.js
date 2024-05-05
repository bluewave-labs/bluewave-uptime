import style from './style';
import compose from './compose';
export function paletteTransform(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}
export var color = style({
  prop: 'color',
  themeKey: 'palette',
  transform: paletteTransform
});
export var bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
export var backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
var palette = compose(color, bgcolor, backgroundColor);
export default palette;