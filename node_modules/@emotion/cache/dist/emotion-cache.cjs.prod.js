'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sheet = require('@emotion/sheet');
var stylis = require('stylis');
var weakMemoize = require('@emotion/weak-memoize');
var memoize = require('@emotion/memoize');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var weakMemoize__default = /*#__PURE__*/_interopDefault(weakMemoize);
var memoize__default = /*#__PURE__*/_interopDefault(memoize);

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = stylis.peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (stylis.token(character)) {
      break;
    }

    stylis.next();
  }

  return stylis.slice(begin, stylis.position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (stylis.token(character)) {
      case 0:
        // &\f
        if (character === 38 && stylis.peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
        break;

      case 2:
        parsed[index] += stylis.delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = stylis.peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += stylis.from(character);
    }
  } while (character = stylis.next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return stylis.dealloc(toRules(stylis.alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch (stylis.hash(value, length)) {
    // color-adjust
    case 5103:
      return stylis.WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return stylis.WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return stylis.WEBKIT + value + stylis.MOZ + value + stylis.MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return stylis.WEBKIT + value + stylis.MS + value + value;
    // order

    case 6165:
      return stylis.WEBKIT + value + stylis.MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return stylis.WEBKIT + value + stylis.replace(value, /(\w+).+(:[^]+)/, stylis.WEBKIT + 'box-$1$2' + stylis.MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return stylis.WEBKIT + value + stylis.MS + 'flex-item-' + stylis.replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return stylis.WEBKIT + value + stylis.MS + 'flex-line-pack' + stylis.replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return stylis.WEBKIT + 'box-' + stylis.replace(value, '-grow', '') + stylis.WEBKIT + value + stylis.MS + stylis.replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return stylis.WEBKIT + stylis.replace(value, /([^-])(transform)/g, '$1' + stylis.WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return stylis.replace(stylis.replace(stylis.replace(value, /(zoom-|grab)/, stylis.WEBKIT + '$1'), /(image-set)/, stylis.WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return stylis.replace(value, /(image-set\([^]*)/, stylis.WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return stylis.replace(stylis.replace(value, /(.+:)(flex-)?(.*)/, stylis.WEBKIT + 'box-pack:$3' + stylis.MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + stylis.WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return stylis.replace(value, /(.+)-inline(.+)/, stylis.WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (stylis.strlen(value) - 1 - length > 6) switch (stylis.charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (stylis.charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return stylis.replace(value, /(.+:)(.+)-([^]+)/, '$1' + stylis.WEBKIT + '$2-$3' + '$1' + stylis.MOZ + (stylis.charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~stylis.indexof(value, 'stretch') ? prefix(stylis.replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (stylis.charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (stylis.charat(value, stylis.strlen(value) - 3 - (~stylis.indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return stylis.replace(value, ':', ':' + stylis.WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return stylis.replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + stylis.WEBKIT + (stylis.charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + stylis.WEBKIT + '$2$3' + '$1' + stylis.MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (stylis.charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return stylis.WEBKIT + value + stylis.MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case stylis.DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case stylis.KEYFRAMES:
      return stylis.serialize([stylis.copy(element, {
        value: stylis.replace(element.value, '@', '@' + stylis.WEBKIT)
      })], callback);

    case stylis.RULESET:
      if (element.length) return stylis.combine(element.props, function (value) {
        switch (stylis.match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return stylis.serialize([stylis.copy(element, {
              props: [stylis.replace(value, /:(read-\w+)/, ':' + stylis.MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return stylis.serialize([stylis.copy(element, {
              props: [stylis.replace(value, /:(plac\w+)/, ':' + stylis.WEBKIT + 'input-$1')]
            }), stylis.copy(element, {
              props: [stylis.replace(value, /:(plac\w+)/, ':' + stylis.MOZ + '$1')]
            }), stylis.copy(element, {
              props: [stylis.replace(value, /:(plac\w+)/, stylis.MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var isBrowser = typeof document !== 'undefined';
var getServerStylisCache = isBrowser ? undefined : weakMemoize__default["default"](function () {
  return memoize__default["default"](function () {
    var cache = {};
    return function (name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (isBrowser && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  if (isBrowser) {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (isBrowser) {
    var currentSheet;
    var finalizingPlugins = [stylis.stringify, stylis.rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis$1 = function stylis$1(styles) {
      return stylis.serialize(stylis.compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      stylis$1(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stylis.stringify];

    var _serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return stylis.serialize(stylis.compile(styles), _serializer);
    }; // $FlowFixMe


    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new sheet.StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

exports["default"] = createCache;
