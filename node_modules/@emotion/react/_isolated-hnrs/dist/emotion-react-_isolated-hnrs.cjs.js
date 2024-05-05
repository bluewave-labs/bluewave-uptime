'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./emotion-react-_isolated-hnrs.cjs.prod.js");
} else {
  module.exports = require("./emotion-react-_isolated-hnrs.cjs.dev.js");
}
