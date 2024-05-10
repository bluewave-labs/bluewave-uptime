"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doesSupportPreventScroll = doesSupportPreventScroll;
// Based on https://stackoverflow.com/a/59518678
let cachedSupportsPreventScroll;
function doesSupportPreventScroll() {
  if (cachedSupportsPreventScroll === undefined) {
    document.createElement('div').focus({
      get preventScroll() {
        cachedSupportsPreventScroll = true;
        return false;
      }
    });
  }
  return cachedSupportsPreventScroll;
}