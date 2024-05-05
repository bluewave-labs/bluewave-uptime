/**
 * Removes event handlers from the given object.
 * A field is considered an event handler if it is a function with a name beginning with `on`.
 *
 * @param object Object to remove event handlers from.
 * @returns Object with event handlers removed.
 */
export function omitEventHandlers(object) {
  if (object === undefined) {
    return {};
  }
  var result = {};
  Object.keys(object).filter(function (prop) {
    return !(prop.match(/^on[A-Z]/) && typeof object[prop] === 'function');
  }).forEach(function (prop) {
    result[prop] = object[prop];
  });
  return result;
}