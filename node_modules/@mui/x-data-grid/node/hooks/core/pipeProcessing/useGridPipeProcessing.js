"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridPipeProcessing = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _toPropertyKey2 = _interopRequireDefault(require("@babel/runtime/helpers/toPropertyKey"));
var React = _interopRequireWildcard(require("react"));
var _useGridApiMethod = require("../../utils/useGridApiMethod");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Implement the Pipeline Pattern
 *
 * More information and detailed example in (TODO add link to technical doc when ready)
 *
 * Some plugins contains custom logic to enrich data provided by other plugins or components.
 * For instance, the row grouping plugin needs to add / remove the grouping columns when the grid columns are updated.
 *
 * =====================================================================================================================
 *
 * The plugin containing the custom logic must use:
 *
 * - `useGridRegisterPipeProcessor` to register their processor.
 *
 * - `apiRef.current.requestPipeProcessorsApplication` to imperatively re-apply a group.
 *   This method should be used in last resort.
 *   Most of the time, the application should be triggered by an update on the deps of the processor.
 *
 * =====================================================================================================================
 *
 * The plugin or component that needs to enrich its data must use:
 *
 * - `apiRef.current.unstable_applyPipeProcessors` to run in chain all the processors of a given group.
 *
 * - `useGridRegisterPipeApplier` to re-apply the whole pipe when requested.
 *   The applier will be called when:
 *   * a processor is registered.
 *   * `apiRef.current.requestPipeProcessorsApplication` is called for the given group.
 */
const useGridPipeProcessing = apiRef => {
  const cache = React.useRef({});
  const isRunning = React.useRef(false);
  const runAppliers = React.useCallback(groupCache => {
    if (isRunning.current || !groupCache) {
      return;
    }
    isRunning.current = true;
    Object.values(groupCache.appliers).forEach(callback => {
      callback();
    });
    isRunning.current = false;
  }, []);
  const registerPipeProcessor = React.useCallback((group, id, processor) => {
    if (!cache.current[group]) {
      cache.current[group] = {
        processors: new Map(),
        processorsAsArray: [],
        appliers: {}
      };
    }
    const groupCache = cache.current[group];
    const oldProcessor = groupCache.processors.get(id);
    if (oldProcessor !== processor) {
      groupCache.processors.set(id, processor);
      groupCache.processorsAsArray = Array.from(cache.current[group].processors.values());
      runAppliers(groupCache);
    }
    return () => {
      cache.current[group].processors.delete(id);
      cache.current[group].processorsAsArray = Array.from(cache.current[group].processors.values());
    };
  }, [runAppliers]);
  const registerPipeApplier = React.useCallback((group, id, applier) => {
    if (!cache.current[group]) {
      cache.current[group] = {
        processors: new Map(),
        processorsAsArray: [],
        appliers: {}
      };
    }
    cache.current[group].appliers[id] = applier;
    return () => {
      const _appliers = cache.current[group].appliers,
        otherAppliers = (0, _objectWithoutPropertiesLoose2.default)(_appliers, [id].map(_toPropertyKey2.default));
      cache.current[group].appliers = otherAppliers;
    };
  }, []);
  const requestPipeProcessorsApplication = React.useCallback(group => {
    runAppliers(cache.current[group]);
  }, [runAppliers]);
  const applyPipeProcessors = React.useCallback((...args) => {
    const [group, value, context] = args;
    if (!cache.current[group]) {
      return value;
    }
    const processors = cache.current[group].processorsAsArray;
    let result = value;
    for (let i = 0; i < processors.length; i += 1) {
      result = processors[i](result, context);
    }
    return result;
  }, []);
  const preProcessingPrivateApi = {
    registerPipeProcessor,
    registerPipeApplier,
    requestPipeProcessorsApplication
  };
  const preProcessingPublicApi = {
    unstable_applyPipeProcessors: applyPipeProcessors
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, preProcessingPrivateApi, 'private');
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, preProcessingPublicApi, 'public');
};
exports.useGridPipeProcessing = useGridPipeProcessing;