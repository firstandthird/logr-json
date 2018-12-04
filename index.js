'use strict';
const stringify = require('fast-safe-stringify');
const _ = require('lodash');

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
  out = _.mergeWith(out, options.additional);
  return stringify(out);
};
