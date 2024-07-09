/**
 * Converts a request body parameter to a boolean.
 * @param {string | boolean} value
 * @returns {boolean}
 */
const ParseBoolean = (value) => {
  if (value === true || value === "true") {
    return true;
  } else if (value === false || value === "false") {
    return false;
  }
  throw new Error("Invalid boolean value");
};

module.exports = {
  ParseBoolean,
};
