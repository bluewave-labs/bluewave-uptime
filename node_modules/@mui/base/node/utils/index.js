"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  appendOwnerState: true,
  areArraysEqual: true,
  ClassNameConfigurator: true,
  extractEventHandlers: true,
  isHostComponent: true,
  resolveComponentProps: true,
  useRootElementName: true,
  useSlotProps: true,
  mergeSlotProps: true,
  prepareForSlot: true
};
Object.defineProperty(exports, "ClassNameConfigurator", {
  enumerable: true,
  get: function () {
    return _ClassNameConfigurator.ClassNameConfigurator;
  }
});
Object.defineProperty(exports, "appendOwnerState", {
  enumerable: true,
  get: function () {
    return _appendOwnerState.appendOwnerState;
  }
});
Object.defineProperty(exports, "areArraysEqual", {
  enumerable: true,
  get: function () {
    return _areArraysEqual.areArraysEqual;
  }
});
Object.defineProperty(exports, "extractEventHandlers", {
  enumerable: true,
  get: function () {
    return _extractEventHandlers.extractEventHandlers;
  }
});
Object.defineProperty(exports, "isHostComponent", {
  enumerable: true,
  get: function () {
    return _isHostComponent.isHostComponent;
  }
});
Object.defineProperty(exports, "mergeSlotProps", {
  enumerable: true,
  get: function () {
    return _mergeSlotProps.mergeSlotProps;
  }
});
Object.defineProperty(exports, "prepareForSlot", {
  enumerable: true,
  get: function () {
    return _prepareForSlot.prepareForSlot;
  }
});
Object.defineProperty(exports, "resolveComponentProps", {
  enumerable: true,
  get: function () {
    return _resolveComponentProps.resolveComponentProps;
  }
});
Object.defineProperty(exports, "useRootElementName", {
  enumerable: true,
  get: function () {
    return _useRootElementName.useRootElementName;
  }
});
Object.defineProperty(exports, "useSlotProps", {
  enumerable: true,
  get: function () {
    return _useSlotProps.useSlotProps;
  }
});
var _appendOwnerState = require("./appendOwnerState");
var _areArraysEqual = require("./areArraysEqual");
var _ClassNameConfigurator = require("./ClassNameConfigurator");
var _extractEventHandlers = require("./extractEventHandlers");
var _isHostComponent = require("./isHostComponent");
var _resolveComponentProps = require("./resolveComponentProps");
var _useRootElementName = require("./useRootElementName");
var _useSlotProps = require("./useSlotProps");
var _mergeSlotProps = require("./mergeSlotProps");
var _prepareForSlot = require("./prepareForSlot");
var _PolymorphicComponent = require("./PolymorphicComponent");
Object.keys(_PolymorphicComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PolymorphicComponent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PolymorphicComponent[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});