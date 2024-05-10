"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TablePagination: true,
  TablePaginationActions: true
};
Object.defineProperty(exports, "TablePagination", {
  enumerable: true,
  get: function () {
    return _TablePagination.TablePagination;
  }
});
Object.defineProperty(exports, "TablePaginationActions", {
  enumerable: true,
  get: function () {
    return _TablePaginationActions.TablePaginationActions;
  }
});
var _TablePagination = require("./TablePagination");
var _TablePagination2 = require("./TablePagination.types");
Object.keys(_TablePagination2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TablePagination2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TablePagination2[key];
    }
  });
});
var _TablePaginationActions = require("./TablePaginationActions");
var _TablePaginationActions2 = require("./TablePaginationActions.types");
Object.keys(_TablePaginationActions2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TablePaginationActions2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TablePaginationActions2[key];
    }
  });
});
var _tablePaginationClasses = require("./tablePaginationClasses");
Object.keys(_tablePaginationClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _tablePaginationClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tablePaginationClasses[key];
    }
  });
});
var _common = require("./common.types");
Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _common[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});