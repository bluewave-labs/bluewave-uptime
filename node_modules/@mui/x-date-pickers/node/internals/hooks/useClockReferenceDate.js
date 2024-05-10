"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClockReferenceDate = void 0;
var React = _interopRequireWildcard(require("react"));
var _valueManagers = require("../utils/valueManagers");
var _dateUtils = require("../utils/date-utils");
var _getDefaultReferenceDate = require("../utils/getDefaultReferenceDate");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useClockReferenceDate = ({
  value,
  referenceDate: referenceDateProp,
  utils,
  props,
  timezone
}) => {
  const referenceDate = React.useMemo(() => _valueManagers.singleItemValueManager.getInitialReferenceValue({
    value,
    utils,
    props,
    referenceDate: referenceDateProp,
    granularity: _getDefaultReferenceDate.SECTION_TYPE_GRANULARITY.day,
    timezone,
    getTodayDate: () => (0, _dateUtils.getTodayDate)(utils, timezone, 'date')
  }),
  // We only want to compute the reference date on mount.
  [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return value ?? referenceDate;
};
exports.useClockReferenceDate = useClockReferenceDate;