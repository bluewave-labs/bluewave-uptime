import _extends from "@babel/runtime/helpers/esm/extends";
import { DATE_TIME_VALIDATION_PROP_NAMES, DATE_VALIDATION_PROP_NAMES, TIME_VALIDATION_PROP_NAMES } from './validation/extractValidationProps';
const SHARED_FIELD_INTERNAL_PROP_NAMES = ['value', 'defaultValue', 'referenceDate', 'format', 'formatDensity', 'onChange', 'timezone', 'onError', 'shouldRespectLeadingZeros', 'selectedSections', 'onSelectedSectionsChange', 'unstableFieldRef', 'enableAccessibleFieldDOMStructure', 'disabled', 'readOnly', 'dateSeparator'];
export const splitFieldInternalAndForwardedProps = (props, valueType) => {
  const forwardedProps = _extends({}, props);
  const internalProps = {};
  const extractProp = propName => {
    if (forwardedProps.hasOwnProperty(propName)) {
      // @ts-ignore
      internalProps[propName] = forwardedProps[propName];
      delete forwardedProps[propName];
    }
  };
  SHARED_FIELD_INTERNAL_PROP_NAMES.forEach(extractProp);
  if (valueType === 'date') {
    DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
  } else if (valueType === 'time') {
    TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
  } else if (valueType === 'date-time') {
    DATE_VALIDATION_PROP_NAMES.forEach(extractProp);
    TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
    DATE_TIME_VALIDATION_PROP_NAMES.forEach(extractProp);
  }
  return {
    forwardedProps,
    internalProps
  };
};