'use strict';
const stringify = require('fast-safe-stringify');
const aug = require('aug');

exports.defaults = {
  tagsObject: false,
  additional: {}
}

exports.log = function(options, tags, message) {
  if (options.tagsObject) {
    const tagsObj = {};
    tags.forEach((tag) => {
      tagsObj[tag] = true;
    });
    tags = tagsObj;
  }
  let out = {
    timestamp: new Date(),
    tags,
    message
  };
  out = aug(out, options.additional);
  return stringify(out);
};
