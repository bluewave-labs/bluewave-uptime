function clamp(val) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MIN_SAFE_INTEGER;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.MAX_SAFE_INTEGER;
  return Math.max(min, Math.min(val, max));
}
export default clamp;