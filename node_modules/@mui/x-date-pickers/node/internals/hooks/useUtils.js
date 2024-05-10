"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUtils = exports.useNow = exports.useLocalizationContext = exports.useLocaleText = exports.useDefaultDates = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _LocalizationProvider = require("../../LocalizationProvider/LocalizationProvider");
var _enUS = require("../../locales/enUS");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useLocalizationContext = () => {
  const localization = React.useContext(_LocalizationProvider.MuiPickersAdapterContext);
  if (localization === null) {
    throw new Error(['MUI X: Can not find the date and time pickers localization context.', 'It looks like you forgot to wrap your component in LocalizationProvider.', 'This can also happen if you are bundling multiple versions of the `@mui/x-date-pickers` package'].join('\n'));
  }
  if (localization.utils === null) {
    throw new Error(['MUI X: Can not find the date and time pickers adapter from its localization context.', 'It looks like you forgot to pass a `dateAdapter` to your LocalizationProvider.'].join('\n'));
  }
  const localeText = React.useMemo(() => (0, _extends2.default)({}, _enUS.DEFAULT_LOCALE, localization.localeText), [localization.localeText]);
  return React.useMemo(() => (0, _extends2.default)({}, localization, {
    localeText
  }), [localization, localeText]);
};
exports.useLocalizationContext = useLocalizationContext;
const useUtils = () => useLocalizationContext().utils;
exports.useUtils = useUtils;
const useDefaultDates = () => useLocalizationContext().defaultDates;
exports.useDefaultDates = useDefaultDates;
const useLocaleText = () => useLocalizationContext().localeText;
exports.useLocaleText = useLocaleText;
const useNow = timezone => {
  const utils = useUtils();
  const now = React.useRef();
  if (now.current === undefined) {
    now.current = utils.date(undefined, timezone);
  }
  return now.current;
};
exports.useNow = useNow;