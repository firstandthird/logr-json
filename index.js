'use strict';
const stringify = require('fast-safe-stringify');
const aug = require('aug');

exports.defaults = {
  tagsObject: false,
  timestamp: true,
  additional: {}
}

exports.log = function(options, tags, message) {
  // determine level of severity:
  let level = 'INFO';
  if (Array.isArray(options)) {
    tags = options;
  }
  if (tags.includes('fatal')) {
   level = 'FATAL';
  } else if (tags.includes('error')) {
   level = 'ERROR';
  } else if (tags.includes('warning')) {
   level = 'WARN';
  } else if (tags.includes('debug')) {
   level = 'DEBUG';
  }
  if (options.tagsObject) {
    const tagsObj = {};
    tags.forEach((tag) => {
      tagsObj[tag] = true;
    });
    tags = tagsObj;
  }
  let out = {
    level,
    tags,
    message
  };
  if (options.timestamp !== false) {
    out.timestamp = new Date();
  }
  out = aug(out, options.additional);
  return stringify(out);
};
