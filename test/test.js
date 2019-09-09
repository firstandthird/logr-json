const tap = require('tap');
const logrJson = require('../index.js');

tap.test('should output to json formatted', (t) => {
  const lastMessage = logrJson.log({}, ['tag1', 'tag2'], 'message');
  const jsonMessage = JSON.parse(lastMessage);
  t.match(jsonMessage.tags, ['tag1', 'tag2']);
  t.match(jsonMessage.message, 'message');
  t.ok(jsonMessage.timestamp);
  t.end();
});

tap.test('should allow timestamps to be turned off', (t) => {
  const lastMessage = logrJson.log({ timestamp: false }, ['tag1', 'tag2'], 'message');
  const jsonMessage = JSON.parse(lastMessage);
  t.match(jsonMessage.tags, ['tag1', 'tag2']);
  t.match(jsonMessage.message, 'message');
  console.log(jsonMessage);
  t.equal(typeof jsonMessage.timestamp, 'undefined');
  t.end();
});

tap.test('should output tags as objects if config set', (t) => {
  const lastMessage = logrJson.log({ tagsObject: true }, ['tag1', 'tag2'], 'message');
  t.match(typeof lastMessage, 'string');
  const jsonMessage = JSON.parse(lastMessage);
  t.match(jsonMessage.tags, { tag1: true, tag2: true });
  t.match(jsonMessage.message, 'message');
  t.ok(jsonMessage.timestamp);
  t.end();
});

tap.test('should allow additional data to be logged', (t) => {
  const lastMessage = logrJson.log({
    additional: {
      host: 'blah.com'
    }
  }, ['tag1', 'tag2'], 'message');
  t.equal(typeof lastMessage, 'string');
  const jsonMessage = JSON.parse(lastMessage);
  t.match(jsonMessage.tags, ['tag1', 'tag2']);
  t.equal(jsonMessage.message, 'message');
  t.equal(jsonMessage.host, 'blah.com');
  t.ok(jsonMessage.timestamp);
  t.end();
});

tap.test('should stringify json in a safe way', (t) => {
  const circularObj = {};
  circularObj.circularRef = circularObj;
  circularObj.list = [circularObj, circularObj];
  logrJson.log(['tag1'], circularObj);
  t.end();
});
