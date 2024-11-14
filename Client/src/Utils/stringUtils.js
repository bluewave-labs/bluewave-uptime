/**
 * Helper function to get first letter capitalized string
 * @param {string} str String whose first letter is to be capitalized
 * @returns A string with first letter capitalized
 */
export const capitalizeFirstLetter = (str) =>{
  return  str?.charAt(0).toUpperCase() + str.slice(1);
}
