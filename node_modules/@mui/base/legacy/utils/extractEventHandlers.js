/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 * @param excludeKeys An array of keys to exclude from the returned object.
 */
export function extractEventHandlers(object) {
  var excludeKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (object === undefined) {
    return {};
  }
  var result = {};
  Object.keys(object).filter(function (prop) {
    return prop.match(/^on[A-Z]/) && typeof object[prop] === 'function' && !excludeKeys.includes(prop);
  }).forEach(function (prop) {
    result[prop] = object[prop];
  });
  return result;
}