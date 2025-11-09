const utils = {
  deepMerge: function deepMerge(target, source) {
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' &&
        !Array.isArray(target[key])
      ) {
        utils.deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }
};

module.exports = utils;
