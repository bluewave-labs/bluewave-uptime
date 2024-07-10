/**
 * Converts a request body parameter to a boolean.
 * @param {string | boolean} value
 * @returns {boolean}
 */
const ParseBoolean = (value) => {
  if (value === true || value === "true") {
    return true;
  } else if (
    value === false ||
    value === "false" ||
    value === null ||
    value === undefined
  ) {
    return false;
  }
};

module.exports = {
  ParseBoolean,
};
