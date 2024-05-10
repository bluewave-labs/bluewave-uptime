"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  unstable_useModal: true
};
Object.defineProperty(exports, "unstable_useModal", {
  enumerable: true,
  get: function () {
    return _useModal.useModal;
  }
});
var _useModal = require("./useModal");
var _useModal2 = require("./useModal.types");
Object.keys(_useModal2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useModal2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useModal2[key];
    }
  });
});
var _ModalManager = require("./ModalManager");
Object.keys(_ModalManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ModalManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ModalManager[key];
    }
  });
});