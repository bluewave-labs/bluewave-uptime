'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getCardMediaUtilityClass } from './cardMediaClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    isMediaComponent = ownerState.isMediaComponent,
    isImageComponent = ownerState.isImageComponent;
  var slots = {
    root: ['root', isMediaComponent && 'media', isImageComponent && 'img']
  };
  return composeClasses(slots, getCardMediaUtilityClass, classes);
};
var CardMediaRoot = styled('div', {
  name: 'MuiCardMedia',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    var isMediaComponent = ownerState.isMediaComponent,
      isImageComponent = ownerState.isImageComponent;
    return [styles.root, isMediaComponent && styles.media, isImageComponent && styles.img];
  }
})(function (_ref) {
  var ownerState = _ref.ownerState;
  return _extends({
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }, ownerState.isMediaComponent && {
    width: '100%'
  }, ownerState.isImageComponent && {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover'
  });
});
var MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];
var IMAGE_COMPONENTS = ['picture', 'img'];
var CardMedia = /*#__PURE__*/React.forwardRef(function CardMedia(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCardMedia'
  });
  var children = props.children,
    className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    image = props.image,
    src = props.src,
    style = props.style,
    other = _objectWithoutProperties(props, ["children", "className", "component", "image", "src", "style"]);
  var isMediaComponent = MEDIA_COMPONENTS.indexOf(component) !== -1;
  var composedStyle = !isMediaComponent && image ? _extends({
    backgroundImage: "url(\"".concat(image, "\")")
  }, style) : style;
  var ownerState = _extends({}, props, {
    component: component,
    isMediaComponent: isMediaComponent,
    isImageComponent: IMAGE_COMPONENTS.indexOf(component) !== -1
  });
  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsx(CardMediaRoot, _extends({
    className: clsx(classes.root, className),
    as: component,
    role: !isMediaComponent && image ? 'img' : undefined,
    ref: ref,
    style: composedStyle,
    ownerState: ownerState,
    src: isMediaComponent ? image || src : undefined
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? CardMedia.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node, function (props) {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error('MUI: Either `children`, `image`, `src` or `component` prop must be specified.');
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: PropTypes.string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: PropTypes.string,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default CardMedia;