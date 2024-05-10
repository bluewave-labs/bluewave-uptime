"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicApiRef = getPublicApiRef;
function getPublicApiRef(apiRef) {
  return {
    current: apiRef.current.getPublicApi()
  };
}