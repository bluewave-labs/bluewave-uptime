"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridPreferencesPanel = exports.preferencePanelStateInitializer = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _useGridLogger = require("../../utils/useGridLogger");
var _pipeProcessing = require("../../core/pipeProcessing");
var _gridPreferencePanelSelector = require("./gridPreferencePanelSelector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const preferencePanelStateInitializer = (state, props) => (0, _extends2.default)({}, state, {
  preferencePanel: props.initialState?.preferencePanel ?? {
    open: false
  }
});

/**
 * TODO: Add a single `setPreferencePanel` method to avoid multiple `setState`
 */
exports.preferencePanelStateInitializer = preferencePanelStateInitializer;
const useGridPreferencesPanel = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridPreferencesPanel');
  const hideTimeout = React.useRef();
  const immediateTimeout = React.useRef();

  /**
   * API METHODS
   */
  const hidePreferences = React.useCallback(() => {
    logger.debug('Hiding Preferences Panel');
    const preferencePanelState = (0, _gridPreferencePanelSelector.gridPreferencePanelStateSelector)(apiRef.current.state);
    if (preferencePanelState.openedPanelValue) {
      apiRef.current.publishEvent('preferencePanelClose', {
        openedPanelValue: preferencePanelState.openedPanelValue
      });
    }
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      preferencePanel: {
        open: false
      }
    }));
    apiRef.current.forceUpdate();
  }, [apiRef, logger]);

  // This is to prevent the preferences from closing when you open a select box or another panel,
  // The issue is in MUI core V4 => Fixed in V5
  const doNotHidePanel = React.useCallback(() => {
    immediateTimeout.current = setTimeout(() => clearTimeout(hideTimeout.current), 0);
  }, []);

  // This is a hack for the issue with Core V4, by delaying hiding the panel on the clickAwayListener,
  // we can cancel the action if the trigger element still need the panel...
  const hidePreferencesDelayed = React.useCallback(() => {
    hideTimeout.current = setTimeout(hidePreferences, 100);
  }, [hidePreferences]);
  const showPreferences = React.useCallback((newValue, panelId, labelId) => {
    logger.debug('Opening Preferences Panel');
    doNotHidePanel();
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      preferencePanel: (0, _extends2.default)({}, state.preferencePanel, {
        open: true,
        openedPanelValue: newValue,
        panelId,
        labelId
      })
    }));
    apiRef.current.publishEvent('preferencePanelOpen', {
      openedPanelValue: newValue
    });
    apiRef.current.forceUpdate();
  }, [logger, doNotHidePanel, apiRef]);
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, {
    showPreferences,
    hidePreferences: hidePreferencesDelayed
  }, 'public');

  /**
   * PRE-PROCESSING
   */
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const preferencePanelToExport = (0, _gridPreferencePanelSelector.gridPreferencePanelStateSelector)(apiRef.current.state);
    const shouldExportPreferencePanel =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the panel was initialized
    props.initialState?.preferencePanel != null ||
    // Always export if the panel is opened
    preferencePanelToExport.open;
    if (!shouldExportPreferencePanel) {
      return prevState;
    }
    return (0, _extends2.default)({}, prevState, {
      preferencePanel: preferencePanelToExport
    });
  }, [apiRef, props.initialState?.preferencePanel]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const preferencePanel = context.stateToRestore.preferencePanel;
    if (preferencePanel != null) {
      apiRef.current.setState(state => (0, _extends2.default)({}, state, {
        preferencePanel
      }));
    }
    return params;
  }, [apiRef]);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'exportState', stateExportPreProcessing);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'restoreState', stateRestorePreProcessing);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    return () => {
      clearTimeout(hideTimeout.current);
      clearTimeout(immediateTimeout.current);
    };
  }, []);
};
exports.useGridPreferencesPanel = useGridPreferencesPanel;