"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridInitialization = void 0;
var _useGridRefs = require("./useGridRefs");
var _useGridTheme = require("./useGridTheme");
var _useGridLoggerFactory = require("./useGridLoggerFactory");
var _useGridApiInitialization = require("./useGridApiInitialization");
var _useGridLocaleText = require("./useGridLocaleText");
var _pipeProcessing = require("./pipeProcessing");
var _strategyProcessing = require("./strategyProcessing");
var _useGridStateInitialization = require("./useGridStateInitialization");
/**
 * Initialize the technical pieces of the DataGrid (logger, state, ...) that any DataGrid implementation needs
 */
const useGridInitialization = (inputApiRef, props) => {
  const privateApiRef = (0, _useGridApiInitialization.useGridApiInitialization)(inputApiRef, props);
  (0, _useGridRefs.useGridRefs)(privateApiRef);
  (0, _useGridTheme.useGridTheme)(privateApiRef);
  (0, _useGridLoggerFactory.useGridLoggerFactory)(privateApiRef, props);
  (0, _useGridStateInitialization.useGridStateInitialization)(privateApiRef);
  (0, _pipeProcessing.useGridPipeProcessing)(privateApiRef);
  (0, _strategyProcessing.useGridStrategyProcessing)(privateApiRef);
  (0, _useGridLocaleText.useGridLocaleText)(privateApiRef, props);
  privateApiRef.current.register('private', {
    rootProps: props
  });
  return privateApiRef;
};
exports.useGridInitialization = useGridInitialization;