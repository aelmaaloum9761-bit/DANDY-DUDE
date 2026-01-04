/**
 * Validates if a string is a valid email address.
 * @param {string} email The email to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

/**
 * Validates if a string is not empty or just whitespace.
 * @param {string} value The string to validate.
 * @returns {boolean} True if not empty, false otherwise.
 */
export const isNotEmpty = (value) => {
  return value.trim().length > 0;
};