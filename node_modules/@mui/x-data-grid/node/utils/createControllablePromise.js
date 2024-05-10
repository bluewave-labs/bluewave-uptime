"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createControllablePromise = createControllablePromise;
function createControllablePromise() {
  let resolve;
  let reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
}