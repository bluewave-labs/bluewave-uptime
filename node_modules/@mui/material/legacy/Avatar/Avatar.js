'use client';

import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled, createUseThemeProps } from '../zero-styled';
import Person from '../internal/svg-icons/Person';
import { getAvatarUtilityClass } from './avatarClasses';
import useSlot from '../utils/useSlot';
import { jsx as _jsx } from "react/jsx-runtime";
var useThemeProps = createUseThemeProps('MuiAvatar');
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    variant = ownerState.variant,
    colorDefault = ownerState.colorDefault;
  var slots = {
    root: ['root', variant, colorDefault && 'colorDefault'],
    img: ['img'],
    fallback: ['fallback']
  };
  return composeClasses(slots, getAvatarUtilityClass, classes);
};
var AvatarRoot = styled('div', {
  name: 'MuiAvatar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles[ownerState.variant], ownerState.colorDefault && styles.colorDefault];
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none',
    variants: [{
      props: {
        variant: 'rounded'
      },
      style: {
        borderRadius: (theme.vars || theme).shape.borderRadius
      }
    }, {
      props: {
        variant: 'square'
      },
      style: {
        borderRadius: 0
      }
    }, {
      props: {
        colorDefault: true
      },
      style: _extends({
        color: (theme.vars || theme).palette.background.default
      }, theme.vars ? {
        backgroundColor: theme.vars.palette.Avatar.defaultBg
      } : _extends({
        backgroundColor: theme.palette.grey[400]
      }, theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[600]
      })))
    }]
  };
});
var AvatarImg = styled('img', {
  name: 'MuiAvatar',
  slot: 'Img',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.img;
  }
})({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image. The property isn't supported by IE11.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000
});
var AvatarFallback = styled(Person, {
  name: 'MuiAvatar',
  slot: 'Fallback',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.fallback;
  }
})({
  width: '75%',
  height: '75%'
});
function useLoaded(_ref2) {
  var crossOrigin = _ref2.crossOrigin,
    referrerPolicy = _ref2.referrerPolicy,
    src = _ref2.src,
    srcSet = _ref2.srcSet;
  var _React$useState = React.useState(false),
    loaded = _React$useState[0],
    setLoaded = _React$useState[1];
  React.useEffect(function () {
    if (!src && !srcSet) {
      return undefined;
    }
    setLoaded(false);
    var active = true;
    var image = new Image();
    image.onload = function () {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = function () {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    image.src = src;
    if (srcSet) {
      image.srcset = srcSet;
    }
    return function () {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);
  return loaded;
}
var Avatar = /*#__PURE__*/React.forwardRef(function Avatar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAvatar'
  });
  var alt = props.alt,
    childrenProp = props.children,
    className = props.className,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    imgProps = props.imgProps,
    sizes = props.sizes,
    src = props.src,
    srcSet = props.srcSet,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'circular' : _props$variant,
    other = _objectWithoutProperties(props, ["alt", "children", "className", "component", "slots", "slotProps", "imgProps", "sizes", "src", "srcSet", "variant"]);
  var children = null;

  // Use a hook instead of onError on the img element to support server-side rendering.
  var loaded = useLoaded(_extends({}, imgProps, {
    src: src,
    srcSet: srcSet
  }));
  var hasImg = src || srcSet;
  var hasImgNotFailing = hasImg && loaded !== 'error';
  var ownerState = _extends({}, props, {
    colorDefault: !hasImgNotFailing,
    component: component,
    variant: variant
  });
  var classes = useUtilityClasses(ownerState);
  var _useSlot = useSlot('img', {
      className: classes.img,
      elementType: AvatarImg,
      externalForwardedProps: {
        slots: slots,
        slotProps: {
          img: _extends({}, imgProps, slotProps.img)
        }
      },
      additionalProps: {
        alt: alt,
        src: src,
        srcSet: srcSet,
        sizes: sizes
      },
      ownerState: ownerState
    }),
    _useSlot2 = _slicedToArray(_useSlot, 2),
    ImgSlot = _useSlot2[0],
    imgSlotProps = _useSlot2[1];
  if (hasImgNotFailing) {
    children = /*#__PURE__*/_jsx(ImgSlot, _extends({}, imgSlotProps));
    // We only render valid children, non valid children are rendered with a fallback
    // We consider that invalid children are all falsy values, except 0, which is valid.
  } else if (!!childrenProp || childrenProp === 0) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = /*#__PURE__*/_jsx(AvatarFallback, {
      ownerState: ownerState,
      className: classes.fallback
    });
  }
  return /*#__PURE__*/_jsx(AvatarRoot, _extends({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Avatar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
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
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   * @deprecated Use `slotProps.img` instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   */
  imgProps: PropTypes.object,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    img: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    img: PropTypes.elementType
  }),
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['circular', 'rounded', 'square']), PropTypes.string])
} : void 0;
export default Avatar;