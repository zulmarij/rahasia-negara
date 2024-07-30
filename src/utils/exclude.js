/**
 * Exclude keys from object
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const exclude = (obj, keys) => {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
};

module.exports = exclude;
