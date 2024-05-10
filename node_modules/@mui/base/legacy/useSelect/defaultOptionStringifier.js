var defaultOptionStringifier = function defaultOptionStringifier(option) {
  var label = option.label,
    value = option.value;
  if (typeof label === 'string') {
    return label;
  }
  if (typeof value === 'string') {
    return value;
  }

  // Fallback string representation
  return String(option);
};
export { defaultOptionStringifier };