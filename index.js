'use strict';
const stringify = require('fast-safe-stringify');
const aug = require('aug');

exports.defaults = {
  tagsObject: false,
  timestamp: true,
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
    tags,
    message
  };
  if (options.timestamp !== false) {
    out.timestamp = new Date();
  }
  out = aug(out, options.additional);
  return stringify(out);
};
