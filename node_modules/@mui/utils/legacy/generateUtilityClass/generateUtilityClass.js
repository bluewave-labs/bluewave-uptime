import ClassNameGenerator from '../ClassNameGenerator';
export var globalStateClasses = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  open: 'open',
  readOnly: 'readOnly',
  required: 'required',
  selected: 'selected'
};
export default function generateUtilityClass(componentName, slot) {
  var globalStatePrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Mui';
  var globalStateClass = globalStateClasses[slot];
  return globalStateClass ? "".concat(globalStatePrefix, "-").concat(globalStateClass) : "".concat(ClassNameGenerator.generate(componentName), "-").concat(slot);
}
export function isGlobalState(slot) {
  return globalStateClasses[slot] !== undefined;
}