/**
 * Helper function to get first letter capitalized string
 * @param {string} str String whose first letter is to be capitalized
 * @returns A string with first letter capitalized
 */
export const capitalizeFirstLetter = (str) => {	
  if (str === null || str === undefined) {
		return "";
	}
	if (typeof str !== "string") {
		throw new TypeError("Input must be a string");
	}
	if (str.length === 0) {
		return "";
	}  
	return str.charAt(0).toUpperCase() + str.slice(1);
};
