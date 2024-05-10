'use client';

import { usePreviousProps } from '@mui/utils';
/**
 *
 * Demos:
 *
 * - [Badge](https://mui.com/base-ui/react-badge/#hook)
 *
 * API:
 *
 * - [useBadge API](https://mui.com/base-ui/react-badge/hooks-api/#use-badge)
 */
export function useBadge(parameters) {
  var badgeContentProp = parameters.badgeContent,
    _parameters$invisible = parameters.invisible,
    invisibleProp = _parameters$invisible === void 0 ? false : _parameters$invisible,
    _parameters$max = parameters.max,
    maxProp = _parameters$max === void 0 ? 99 : _parameters$max,
    _parameters$showZero = parameters.showZero,
    showZero = _parameters$showZero === void 0 ? false : _parameters$showZero;
  var prevProps = usePreviousProps({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  var invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  var _ref = invisible ? prevProps : parameters,
    badgeContent = _ref.badgeContent,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? maxProp : _ref$max;
  var displayValue = badgeContent && Number(badgeContent) > max ? "".concat(max, "+") : badgeContent;
  return {
    badgeContent: badgeContent,
    invisible: invisible,
    max: max,
    displayValue: displayValue
  };
}