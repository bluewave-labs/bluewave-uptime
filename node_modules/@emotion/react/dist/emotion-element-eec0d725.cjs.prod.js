'use strict';

var React = require('react');
var createCache = require('@emotion/cache');
var _extends = require('@babel/runtime/helpers/extends');
var weakMemoize = require('@emotion/weak-memoize');
var _isolatedHnrs_dist_emotionReact_isolatedHnrs = require('../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.prod.js');
var utils = require('@emotion/utils');
var serialize = require('@emotion/serialize');
var useInsertionEffectWithFallbacks = require('@emotion/use-insertion-effect-with-fallbacks');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var createCache__default = /*#__PURE__*/_interopDefault(createCache);
var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);

var isBrowser = typeof document !== 'undefined';
var hasOwn = {}.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */React__namespace.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache__default["default"]({
  key: 'css'
}) : null);

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return React.useContext(EmotionCacheContext);
};

exports.withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = React.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

if (!isBrowser) {
  exports.withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      var cache = React.useContext(EmotionCacheContext);

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache__default["default"]({
          key: 'css'
        });
        return /*#__PURE__*/React__namespace.createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}

var ThemeContext = /* #__PURE__ */React__namespace.createContext({});

var useTheme = function useTheme() {
  return React__namespace.useContext(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return _extends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize__default["default"](function (outerTheme) {
  return weakMemoize__default["default"](function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = React__namespace.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/React__namespace.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = React__namespace.useContext(ThemeContext);
    return /*#__PURE__*/React__namespace.createElement(Component, _extends({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/React__namespace.forwardRef(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return _isolatedHnrs_dist_emotionReact_isolatedHnrs["default"](WithTheme, Component);
}

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {

  var newProps = {};

  for (var key in props) {
    if (hasOwn.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when

  return newProps;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  utils.registerStyles(cache, serialized, isStringTag);
  var rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function () {
    return utils.insertStyles(cache, serialized, isStringTag);
  });

  if (!isBrowser && rules !== undefined) {
    var _ref2;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/React__namespace.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }

  return null;
};

var Emotion = /* #__PURE__ */exports.withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = utils.getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serialize.serializeStyles(registeredStyles, undefined, React__namespace.useContext(ThemeContext));

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwn.call(props, key) && key !== 'css' && key !== typePropName && (        "production" === 'production' )) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/React__namespace.createElement(WrappedComponent, newProps));
});

var Emotion$1 = Emotion;

exports.CacheProvider = CacheProvider;
exports.Emotion = Emotion$1;
exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.__unsafe_useEmotionCache = __unsafe_useEmotionCache;
exports.createEmotionProps = createEmotionProps;
exports.hasOwn = hasOwn;
exports.isBrowser = isBrowser;
exports.useTheme = useTheme;
exports.withTheme = withTheme;
