/**
 * Converts a request body parameter to a boolean.
 * @param {string | boolean} value
 * @returns {boolean}
 */
const ParseBoolean = (value) => {
  if (value === true || value === "true") {
    return true;
  }
  return false;
};

module.exports = {
  ParseBoolean,
};
