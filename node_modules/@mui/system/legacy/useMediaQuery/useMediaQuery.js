'use client';

import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import { getThemeProps } from '../useThemeProps';
import useTheme from '../useThemeWithoutDefault';

/**
 * @deprecated Not used internally. Use `MediaQueryListEvent` from lib.dom.d.ts instead.
 */

/**
 * @deprecated Not used internally. Use `MediaQueryList` from lib.dom.d.ts instead.
 */

/**
 * @deprecated Not used internally. Use `(event: MediaQueryListEvent) => void` instead.
 */

function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
  var _React$useState = React.useState(function () {
      if (noSsr && matchMedia) {
        return matchMedia(query).matches;
      }
      if (ssrMatchMedia) {
        return ssrMatchMedia(query).matches;
      }

      // Once the component is mounted, we rely on the
      // event listeners to return the correct matches value.
      return defaultMatches;
    }),
    match = _React$useState[0],
    setMatch = _React$useState[1];
  useEnhancedEffect(function () {
    var active = true;
    if (!matchMedia) {
      return undefined;
    }
    var queryList = matchMedia(query);
    var updateMatch = function updateMatch() {
      // Workaround Safari wrong implementation of matchMedia
      // TODO can we remove it?
      // https://github.com/mui/material-ui/pull/17315#issuecomment-528286677
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    // TODO: Use `addEventListener` once support for Safari < 14 is dropped
    queryList.addListener(updateMatch);
    return function () {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia]);
  return match;
}

// eslint-disable-next-line no-useless-concat -- Workaround for https://github.com/webpack/webpack/issues/14814
var maybeReactUseSyncExternalStore = React['useSyncExternalStore' + ''];
function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
  var getDefaultSnapshot = React.useCallback(function () {
    return defaultMatches;
  }, [defaultMatches]);
  var getServerSnapshot = React.useMemo(function () {
    if (noSsr && matchMedia) {
      return function () {
        return matchMedia(query).matches;
      };
    }
    if (ssrMatchMedia !== null) {
      var _ssrMatchMedia = ssrMatchMedia(query),
        matches = _ssrMatchMedia.matches;
      return function () {
        return matches;
      };
    }
    return getDefaultSnapshot;
  }, [getDefaultSnapshot, query, ssrMatchMedia, noSsr, matchMedia]);
  var _React$useMemo = React.useMemo(function () {
      if (matchMedia === null) {
        return [getDefaultSnapshot, function () {
          return function () {};
        }];
      }
      var mediaQueryList = matchMedia(query);
      return [function () {
        return mediaQueryList.matches;
      }, function (notify) {
        // TODO: Use `addEventListener` once support for Safari < 14 is dropped
        mediaQueryList.addListener(notify);
        return function () {
          mediaQueryList.removeListener(notify);
        };
      }];
    }, [getDefaultSnapshot, matchMedia, query]),
    _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
    getSnapshot = _React$useMemo2[0],
    subscribe = _React$useMemo2[1];
  var match = maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return match;
}
export default function useMediaQuery(queryInput) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var theme = useTheme();
  // Wait for jsdom to support the match media feature.
  // All the browsers MUI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.
  var supportMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  var _getThemeProps = getThemeProps({
      name: 'MuiUseMediaQuery',
      props: options,
      theme: theme
    }),
    _getThemeProps$defaul = _getThemeProps.defaultMatches,
    defaultMatches = _getThemeProps$defaul === void 0 ? false : _getThemeProps$defaul,
    _getThemeProps$matchM = _getThemeProps.matchMedia,
    matchMedia = _getThemeProps$matchM === void 0 ? supportMatchMedia ? window.matchMedia : null : _getThemeProps$matchM,
    _getThemeProps$ssrMat = _getThemeProps.ssrMatchMedia,
    ssrMatchMedia = _getThemeProps$ssrMat === void 0 ? null : _getThemeProps$ssrMat,
    _getThemeProps$noSsr = _getThemeProps.noSsr,
    noSsr = _getThemeProps$noSsr === void 0 ? false : _getThemeProps$noSsr;
  if (process.env.NODE_ENV !== 'production') {
    if (typeof queryInput === 'function' && theme === null) {
      console.error(['MUI: The `query` argument provided is invalid.', 'You are providing a function without a theme in the context.', 'One of the parent elements needs to use a ThemeProvider.'].join('\n'));
    }
  }
  var query = typeof queryInput === 'function' ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, '');

  // TODO: Drop `useMediaQueryOld` and use  `use-sync-external-store` shim in `useMediaQueryNew` once the package is stable
  var useMediaQueryImplementation = maybeReactUseSyncExternalStore !== undefined ? useMediaQueryNew : useMediaQueryOld;
  var match = useMediaQueryImplementation(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue({
      query: query,
      match: match
    });
  }
  return match;
}