import { singleItemFieldValueManager, singleItemValueManager } from '../internals/utils/valueManagers';
import { useField } from '../internals/hooks/useField';
import { validateTime } from '../internals/utils/validation/validateTime';
import { splitFieldInternalAndForwardedProps } from '../internals/utils/fields';
import { useDefaultizedTimeField } from '../internals/hooks/defaultizedFieldProps';
export const useTimeField = inProps => {
  const props = useDefaultizedTimeField(inProps);
  const {
    forwardedProps,
    internalProps
  } = splitFieldInternalAndForwardedProps(props, 'time');
  return useField({
    forwardedProps,
    internalProps,
    valueManager: singleItemValueManager,
    fieldValueManager: singleItemFieldValueManager,
    validator: validateTime,
    valueType: 'time'
  });
};