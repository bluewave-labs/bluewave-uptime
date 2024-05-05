'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./emotion-use-insertion-effect-with-fallbacks.cjs.prod.js");
} else {
  module.exports = require("./emotion-use-insertion-effect-with-fallbacks.cjs.dev.js");
}
