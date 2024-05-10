import { singleItemFieldValueManager, singleItemValueManager } from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { validateDateTime } from '../internals/utils/validation/validateDateTime';
import { splitFieldInternalAndForwardedProps } from '../internals/utils/fields';
import { useDefaultizedDateTimeField } from '../internals/hooks/defaultizedFieldProps';
export const useDateTimeField = inProps => {
  const props = useDefaultizedDateTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'date-time');
  return useField({
    forwardedProps,
    internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateDateTime,
    valueType: 'date-time'
  });
};