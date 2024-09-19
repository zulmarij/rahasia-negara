const selectedField = (keys) => {
  return keys.reduce((obj, k) => ({ ...obj, [k]: true }), {});
};

module.exports = selectedField;
