/**
 * Update Local Storage
 * @desc Updates localStorage
 * @param {string} key used to identify the key in localStorage
 * @param {array} value array to be sent to localStorage
 */
export function updateLocalStorage (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Trim and LowerCase
 * @desc Removes whitespace and transforms value to lowercase
 * @param {string} value to be trimmed and lowercased
 */
export function trimAndLowerCase (value) {
  return value.trim().toLowerCase();
};

/**
 * Reset Input
 * @desc Resets value of input field
 * @param {string} input element identifier
 */
export function resetInput (input) {
  input.value = '' || null;
};