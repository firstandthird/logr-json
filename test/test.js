//WIP
  describe('json', () => {
    it('should output to json formatted', () => {
      const log = new Logr({ logger, type: 'json' });
      log(['tag1', 'tag2'], 'message');
      expect(typeof lastMessage).to.equal('string');
      const jsonMessage = JSON.parse(lastMessage);
      expect(jsonMessage.tags).to.deep.equal(['tag1', 'tag2']);
      expect(jsonMessage.message).to.equal('message');
      expect(jsonMessage.timestamp).to.exist;
    });
    it('should output tags as objects if config set', () => {
      const log = new Logr({
        logger,
        type: 'json',
        renderOptions: {
          json: {
            tagsObject: true
          }
        }
      });
      log(['tag1', 'tag2'], 'message');
      expect(typeof lastMessage).to.equal('string');
      const jsonMessage = JSON.parse(lastMessage);
      expect(jsonMessage.tags).to.deep.equal({ tag1: true, tag2: true });
      expect(jsonMessage.message).to.equal('message');
      expect(jsonMessage.timestamp).to.exist;
    });
    it('should be able to accept an error instance', () => {
      const log = new Logr({ logger, type: 'json' });
      log(new Error('my error'));
      const jsonObject = JSON.parse(lastMessage);
      expect(jsonObject.tags).to.include('error');
      expect(jsonObject.message.message).to.include('my error');
      expect(jsonObject.message.stack).to.include('Error: my error');
      expect(jsonObject.message.stack).to.include('logr.test.js');
    });
    it('should allow additional data to be logged', () => {
      const log = new Logr({
        logger,
        type: 'json',
        renderOptions: {
          json: {
            additional: {
              host: 'blah.com'
            }
          }
        }
      });
      log(['tag1', 'tag2'], 'message');
      expect(typeof lastMessage).to.equal('string');
      const jsonMessage = JSON.parse(lastMessage);
      expect(jsonMessage.tags).to.deep.equal(['tag1', 'tag2']);
      expect(jsonMessage.message).to.equal('message');
      expect(jsonMessage.host).to.equal('blah.com');
      expect(jsonMessage.timestamp).to.exist;
    });
    it('should stringify json in a safe way', () => {
      const circularObj = {};
      circularObj.circularRef = circularObj;
      circularObj.list = [circularObj, circularObj];
      const log = new Logr({ logger, type: 'json' });
      log(['tag1'], circularObj);
    });
  });

