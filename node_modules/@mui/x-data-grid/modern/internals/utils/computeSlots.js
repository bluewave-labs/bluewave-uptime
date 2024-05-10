import _extends from "@babel/runtime/helpers/esm/extends";
export function computeSlots({
  defaultSlots,
  slots
}) {
  const overrides = slots;
  if (!overrides || Object.keys(overrides).length === 0) {
    return defaultSlots;
  }
  const result = _extends({}, defaultSlots);
  Object.keys(overrides).forEach(key => {
    const k = key;
    if (overrides[k] !== undefined) {
      result[k] = overrides[k];
    }
  });
  return result;
}