/**
 * Format a date as `12 Jan 2026`.
 *
 * @param {Date|string|number} value
 *
 * @returns {string}
 */
export function formatDate(value) {
  const date = new Date(value);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format a date as `12-06-2026`.
 *
 * @param {Date|string|number} value
 *
 * @returns {string}
 */
export function formatDateNumeric(value) {
  const date = new Date(value);

  const day = String(date.getDate()).padStart(2, "0");

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

/**
 * Format a date as `12-06-2026 02:45 PM`.
 *
 * @param {Date|string|number} value
 *
 * @returns {string}
 */
export function formatDateTime(value) {
  const date = new Date(value);

  const day = String(date.getDate()).padStart(2, "0");

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = date.getFullYear();

  let hours = date.getHours();

  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${day}-${month}-${year} ${String(hours).padStart(
    2,
    "0",
  )}:${minutes} ${period}`;
}

/**
 * Format a relative timestamp.
 *
 * Examples:
 *
 * - 45 sec ago
 * - 2 min ago
 * - 3 h ago
 * - 5 d ago
 * - 2 mo ago
 * - 1 y ago
 *
 * @param {Date|string|number} value
 *
 * @returns {string}
 */
export function formatRelativeTime(value) {
  const seconds = Math.floor((Date.now() - new Date(value).getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} sec ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} d ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} mo ago`;
  }

  const years = Math.floor(days / 365);

  return `${years} y ago`;
}
