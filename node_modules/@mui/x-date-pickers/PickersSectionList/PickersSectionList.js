import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["slots", "slotProps", "elements", "sectionListRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/utils/composeClasses';
import useForkRef from '@mui/utils/useForkRef';
import { styled, useThemeProps } from '@mui/material/styles';
import { getPickersSectionListUtilityClass, pickersSectionListClasses } from './pickersSectionListClasses';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PickersSectionListRoot = styled('div', {
  name: 'MuiPickersSectionList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  direction: 'ltr /*! @noflip */',
  outline: 'none'
});
export const PickersSectionListSection = styled('span', {
  name: 'MuiPickersSectionList',
  slot: 'Section',
  overridesResolver: (props, styles) => styles.section
})({});
export const PickersSectionListSectionSeparator = styled('span', {
  name: 'MuiPickersSectionList',
  slot: 'SectionSeparator',
  overridesResolver: (props, styles) => styles.sectionSeparator
})({
  whiteSpace: 'pre'
});
export const PickersSectionListSectionContent = styled('span', {
  name: 'MuiPickersSectionList',
  slot: 'SectionContent',
  overridesResolver: (props, styles) => styles.sectionContent
})({
  outline: 'none'
});
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    section: ['section'],
    sectionContent: ['sectionContent']
  };
  return composeClasses(slots, getPickersSectionListUtilityClass, classes);
};
/**
 * Demos:
 *
 * - [Custom field](https://mui.com/x/react-date-pickers/custom-field/)
 *
 * API:
 *
 * - [PickersSectionList API](https://mui.com/x/api/date-pickers/pickers-section-list/)
 */
function PickersSection(props) {
  const {
    slots,
    slotProps,
    element,
    classes
  } = props;
  const Section = slots?.section ?? PickersSectionListSection;
  const sectionProps = useSlotProps({
    elementType: Section,
    externalSlotProps: slotProps?.section,
    externalForwardedProps: element.container,
    className: classes.section,
    ownerState: {}
  });
  const SectionContent = slots?.sectionContent ?? PickersSectionListSectionContent;
  const sectionContentProps = useSlotProps({
    elementType: SectionContent,
    externalSlotProps: slotProps?.sectionContent,
    externalForwardedProps: element.content,
    additionalProps: {
      suppressContentEditableWarning: true
    },
    className: classes.sectionContent,
    ownerState: {}
  });
  const SectionSeparator = slots?.sectionSeparator ?? PickersSectionListSectionSeparator;
  const sectionSeparatorBeforeProps = useSlotProps({
    elementType: SectionSeparator,
    externalSlotProps: slotProps?.sectionSeparator,
    externalForwardedProps: element.before,
    ownerState: {
      position: 'before'
    }
  });
  const sectionSeparatorAfterProps = useSlotProps({
    elementType: SectionSeparator,
    externalSlotProps: slotProps?.sectionSeparator,
    externalForwardedProps: element.after,
    ownerState: {
      position: 'after'
    }
  });
  return /*#__PURE__*/_jsxs(Section, _extends({}, sectionProps, {
    children: [/*#__PURE__*/_jsx(SectionSeparator, _extends({}, sectionSeparatorBeforeProps)), /*#__PURE__*/_jsx(SectionContent, _extends({}, sectionContentProps)), /*#__PURE__*/_jsx(SectionSeparator, _extends({}, sectionSeparatorAfterProps))]
  }));
}
const PickersSectionList = /*#__PURE__*/React.forwardRef(function PickersSectionList(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiPickersSectionList'
  });
  const {
      slots,
      slotProps,
      elements,
      sectionListRef
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const classes = useUtilityClasses(props);
  const rootRef = React.useRef(null);
  const handleRootRef = useForkRef(ref, rootRef);
  const getRoot = methodName => {
    if (!rootRef.current) {
      throw new Error(`MUI X: Cannot call sectionListRef.${methodName} before the mount of the component.`);
    }
    return rootRef.current;
  };
  React.useImperativeHandle(sectionListRef, () => ({
    getRoot() {
      return getRoot('getRoot');
    },
    getSectionContainer(index) {
      const root = getRoot('getSectionContainer');
      return root.querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"]`);
    },
    getSectionContent(index) {
      const root = getRoot('getSectionContent');
      return root.querySelector(`.${pickersSectionListClasses.section}[data-sectionindex="${index}"] .${pickersSectionListClasses.sectionContent}`);
    },
    getSectionIndexFromDOMElement(element) {
      const root = getRoot('getSectionIndexFromDOMElement');
      if (element == null || !root.contains(element)) {
        return null;
      }
      let sectionContainer = null;
      if (element.classList.contains(pickersSectionListClasses.section)) {
        sectionContainer = element;
      } else if (element.classList.contains(pickersSectionListClasses.sectionContent)) {
        sectionContainer = element.parentElement;
      }
      if (sectionContainer == null) {
        return null;
      }
      return Number(sectionContainer.dataset.sectionindex);
    }
  }));
  const Root = slots?.root ?? PickersSectionListRoot;
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps?.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: handleRootRef,
      suppressContentEditableWarning: true
    },
    className: classes.root,
    ownerState: {}
  });
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: rootProps.contentEditable ? elements.map(({
      content,
      before,
      after
    }) => `${before.children}${content.children}${after.children}`).join('') : /*#__PURE__*/_jsx(React.Fragment, {
      children: elements.map((element, elementIndex) => /*#__PURE__*/_jsx(PickersSection, {
        slots: slots,
        slotProps: slotProps,
        element: element,
        classes: classes
      }, elementIndex))
    })
  }));
});
process.env.NODE_ENV !== "production" ? PickersSectionList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: PropTypes.bool.isRequired,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: PropTypes.arrayOf(PropTypes.shape({
    after: PropTypes.object.isRequired,
    before: PropTypes.object.isRequired,
    container: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
  })).isRequired,
  sectionListRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      getRoot: PropTypes.func.isRequired,
      getSectionContainer: PropTypes.func.isRequired,
      getSectionContent: PropTypes.func.isRequired,
      getSectionIndexFromDOMElement: PropTypes.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   */
  slots: PropTypes.object
} : void 0;
export { PickersSectionList };