/**
 * Formats a number into a currency string.
 * @param {number} amount The number to format.
 * @param {string} [currency='MAD'] The currency code. Default is now MAD.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, currency = 'MAD') => {
  // Using the built-in Intl.NumberFormat for robust formatting
  // We use 'fr-MA' (French for Morocco) for common number formatting in the region
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Formats a date string into a more readable format.
 * @param {string} dateString The ISO date string.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};