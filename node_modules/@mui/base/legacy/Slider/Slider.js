'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@mui/utils';
import { isHostComponent } from '../utils/isHostComponent';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getSliderUtilityClass } from './sliderClasses';
import { useSlider, valueToPercent } from '../useSlider';
import { useSlotProps } from '../utils/useSlotProps';
import { resolveComponentProps } from '../utils/resolveComponentProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

// @ts-ignore
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Identity(x) {
  return x;
}
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var disabled = ownerState.disabled,
    dragging = ownerState.dragging,
    marked = ownerState.marked,
    orientation = ownerState.orientation,
    track = ownerState.track;
  var slots = {
    root: ['root', disabled && 'disabled', dragging && 'dragging', marked && 'marked', orientation === 'vertical' && 'vertical', track === 'inverted' && 'trackInverted', track === false && 'trackFalse'],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled'],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible']
  };
  return composeClasses(slots, useClassNamesOverride(getSliderUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Slider](https://mui.com/base-ui/react-slider/)
 *
 * API:
 *
 * - [Slider API](https://mui.com/base-ui/react-slider/components-api/#slider)
 */
var Slider = /*#__PURE__*/React.forwardRef(function Slider(props, forwardedRef) {
  var _slots$root, _slots$rail, _slots$track, _slots$thumb, _slots$mark, _slots$markLabel;
  var ariaLabel = props['aria-label'],
    ariaValuetext = props['aria-valuetext'],
    ariaLabelledby = props['aria-labelledby'],
    className = props.className,
    _props$disableSwap = props.disableSwap,
    disableSwap = _props$disableSwap === void 0 ? false : _props$disableSwap,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    getAriaLabel = props.getAriaLabel,
    getAriaValueText = props.getAriaValueText,
    _props$marks = props.marks,
    marksProp = _props$marks === void 0 ? false : _props$marks,
    _props$max = props.max,
    max = _props$max === void 0 ? 100 : _props$max,
    _props$min = props.min,
    min = _props$min === void 0 ? 0 : _props$min,
    name = props.name,
    onChange = props.onChange,
    onChangeCommitted = props.onChangeCommitted,
    _props$orientation = props.orientation,
    orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
    _props$shiftStep = props.shiftStep,
    shiftStep = _props$shiftStep === void 0 ? 10 : _props$shiftStep,
    _props$scale = props.scale,
    scale = _props$scale === void 0 ? Identity : _props$scale,
    _props$step = props.step,
    step = _props$step === void 0 ? 1 : _props$step,
    tabIndex = props.tabIndex,
    _props$track = props.track,
    track = _props$track === void 0 ? 'normal' : _props$track,
    valueProp = props.value,
    _props$valueLabelForm = props.valueLabelFormat,
    valueLabelFormat = _props$valueLabelForm === void 0 ? Identity : _props$valueLabelForm,
    _props$isRtl = props.isRtl,
    isRtl = _props$isRtl === void 0 ? false : _props$isRtl,
    defaultValue = props.defaultValue,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["aria-label", "aria-valuetext", "aria-labelledby", "className", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "orientation", "shiftStep", "scale", "step", "tabIndex", "track", "value", "valueLabelFormat", "isRtl", "defaultValue", "slotProps", "slots"]); // all props with defaults
  // consider extracting to hook an reusing the lint rule for the variants
  var partialOwnerState = _extends({}, props, {
    marks: marksProp,
    disabled: disabled,
    disableSwap: disableSwap,
    isRtl: isRtl,
    defaultValue: defaultValue,
    max: max,
    min: min,
    orientation: orientation,
    scale: scale,
    step: step,
    shiftStep: shiftStep,
    track: track,
    valueLabelFormat: valueLabelFormat
  });
  var _useSlider = useSlider(_extends({}, partialOwnerState, {
      rootRef: forwardedRef
    })),
    axisProps = _useSlider.axisProps,
    getRootProps = _useSlider.getRootProps,
    getHiddenInputProps = _useSlider.getHiddenInputProps,
    getThumbProps = _useSlider.getThumbProps,
    active = _useSlider.active,
    axis = _useSlider.axis,
    range = _useSlider.range,
    focusedThumbIndex = _useSlider.focusedThumbIndex,
    dragging = _useSlider.dragging,
    marks = _useSlider.marks,
    values = _useSlider.values,
    trackOffset = _useSlider.trackOffset,
    trackLeap = _useSlider.trackLeap,
    getThumbStyle = _useSlider.getThumbStyle;
  var ownerState = _extends({}, partialOwnerState, {
    marked: marks.length > 0 && marks.some(function (mark) {
      return mark.label;
    }),
    dragging: dragging,
    focusedThumbIndex: focusedThumbIndex,
    activeThumbIndex: active
  });
  var classes = useUtilityClasses(ownerState);
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'span';
  var rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState: ownerState,
    className: [classes.root, className]
  });
  var Rail = (_slots$rail = slots.rail) != null ? _slots$rail : 'span';
  var railProps = useSlotProps({
    elementType: Rail,
    externalSlotProps: slotProps.rail,
    ownerState: ownerState,
    className: classes.rail
  });
  var Track = (_slots$track = slots.track) != null ? _slots$track : 'span';
  var trackProps = useSlotProps({
    elementType: Track,
    externalSlotProps: slotProps.track,
    additionalProps: {
      style: _extends({}, axisProps[axis].offset(trackOffset), axisProps[axis].leap(trackLeap))
    },
    ownerState: ownerState,
    className: classes.track
  });
  var Thumb = (_slots$thumb = slots.thumb) != null ? _slots$thumb : 'span';
  var thumbProps = useSlotProps({
    elementType: Thumb,
    getSlotProps: getThumbProps,
    externalSlotProps: slotProps.thumb,
    ownerState: ownerState,
    skipResolvingSlotProps: true
  });
  var ValueLabel = slots.valueLabel;
  var valueLabelProps = useSlotProps({
    elementType: ValueLabel,
    externalSlotProps: slotProps.valueLabel,
    ownerState: ownerState
  });
  var Mark = (_slots$mark = slots.mark) != null ? _slots$mark : 'span';
  var markProps = useSlotProps({
    elementType: Mark,
    externalSlotProps: slotProps.mark,
    ownerState: ownerState,
    className: classes.mark
  });
  var MarkLabel = (_slots$markLabel = slots.markLabel) != null ? _slots$markLabel : 'span';
  var markLabelProps = useSlotProps({
    elementType: MarkLabel,
    externalSlotProps: slotProps.markLabel,
    ownerState: ownerState
  });
  var Input = slots.input || 'input';
  var inputProps = useSlotProps({
    elementType: Input,
    getSlotProps: getHiddenInputProps,
    externalSlotProps: slotProps.input,
    ownerState: ownerState
  });
  return /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
    children: [/*#__PURE__*/_jsx(Rail, _extends({}, railProps)), /*#__PURE__*/_jsx(Track, _extends({}, trackProps)), marks.filter(function (mark) {
      return mark.value >= min && mark.value <= max;
    }).map(function (mark, index) {
      var percent = valueToPercent(mark.value, min, max);
      var style = axisProps[axis].offset(percent);
      var markActive;
      if (track === false) {
        markActive = values.indexOf(mark.value) !== -1;
      } else {
        markActive = track === 'normal' && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === 'inverted' && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
      }
      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(Mark, _extends({
          "data-index": index
        }, markProps, !isHostComponent(Mark) && {
          markActive: markActive
        }, {
          style: _extends({}, style, markProps.style),
          className: clsx(markProps.className, markActive && classes.markActive)
        })), mark.label != null ? /*#__PURE__*/_jsx(MarkLabel, _extends({
          "aria-hidden": true,
          "data-index": index
        }, markLabelProps, !isHostComponent(MarkLabel) && {
          markLabelActive: markActive
        }, {
          style: _extends({}, style, markLabelProps.style),
          className: clsx(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, index);
    }), values.map(function (value, index) {
      var percent = valueToPercent(value, min, max);
      var style = axisProps[axis].offset(percent);
      var resolvedSlotProps = resolveComponentProps(slotProps.thumb, ownerState, {
        index: index,
        focused: focusedThumbIndex === index,
        active: active === index
      });
      return /*#__PURE__*/_jsxs(Thumb, _extends({
        "data-index": index
      }, thumbProps, resolvedSlotProps, {
        className: clsx(classes.thumb, thumbProps.className, resolvedSlotProps == null ? void 0 : resolvedSlotProps.className, active === index && classes.active, focusedThumbIndex === index && classes.focusVisible),
        style: _extends({}, style, getThumbStyle(index), thumbProps.style, resolvedSlotProps == null ? void 0 : resolvedSlotProps.style),
        children: [/*#__PURE__*/_jsx(Input, _extends({
          "data-index": index,
          "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
          "aria-valuenow": scale(value),
          "aria-labelledby": ariaLabelledby,
          "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
          value: values[index]
        }, inputProps)), ValueLabel ? /*#__PURE__*/_jsx(ValueLabel, _extends({}, !isHostComponent(ValueLabel) && {
          valueLabelFormat: valueLabelFormat,
          index: index,
          disabled: disabled
        }, valueLabelProps, {
          children: typeof valueLabelFormat === 'function' ? valueLabelFormat(scale(value), index) : valueLabelFormat
        })) : null]
      }), index);
    })]
  }));
});
process.env.NODE_ENV !== "production" ? Slider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, function (props) {
    var range = Array.isArray(props.value || props.defaultValue);
    if (range && props['aria-label'] != null) {
      return new Error('MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.');
    }
    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, function (props) {
    var range = Array.isArray(props.value || props.defaultValue);
    if (range && props['aria-valuetext'] != null) {
      return new Error('MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.');
    }
    return null;
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: PropTypes.func,
  /**
   * If `true` the Slider will be rendered right-to-left (with the lowest value on the right-hand side).
   * @default false
   */
  isRtl: PropTypes.bool,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.number.isRequired
  })), PropTypes.bool]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: PropTypes.func,
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep: PropTypes.number,
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mark: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    markLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rail: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    valueLabel: PropTypes.oneOfType([PropTypes.any, PropTypes.func])
  }),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    mark: PropTypes.elementType,
    markLabel: PropTypes.elementType,
    rail: PropTypes.elementType,
    root: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
    valueLabel: PropTypes.elementType
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: PropTypes.number,
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: PropTypes.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: PropTypes.oneOf(['inverted', 'normal', false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
} : void 0;
export { Slider };