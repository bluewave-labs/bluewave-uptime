export function throttle(func, wait = 166) {
  let timeout;
  let lastArgs;
  const later = () => {
    timeout = undefined;
    func(...lastArgs);
  };
  function throttled(...args) {
    lastArgs = args;
    if (timeout === undefined) {
      timeout = setTimeout(later, wait);
    }
  }
  throttled.clear = () => {
    clearTimeout(timeout);
    timeout = undefined;
  };
  return throttled;
}