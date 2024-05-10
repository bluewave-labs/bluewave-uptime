import { singleItemFieldValueManager, singleItemValueManager } from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { validateDate } from '../internals/utils/validation/validateDate';
import { splitFieldInternalAndForwardedProps } from '../internals/utils/fields';
import { useDefaultizedDateField } from '../internals/hooks/defaultizedFieldProps';
export const useDateField = inProps => {
  const props = useDefaultizedDateField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'date');
  return useField({
    forwardedProps,
    internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateDate,
    valueType: 'date'
  });
};