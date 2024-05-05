/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
export function isHostComponent(element) {
  return typeof element === 'string';
}