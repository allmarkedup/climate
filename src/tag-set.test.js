const {expect} = require('chai');
const Tag = require('./tag');
const TagSet = require('./tag-set');

const tags = {
  em: {
    display: 'inline'
  }
};

describe('TagSet', function () {
  describe('constructor', function () {
    it('instantiates an array of tags from config', function () {
      const set = new TagSet(tags);
      expect(set.tags.length).to.equal(1);
    });
  });

  describe('.tags', function () {
    it('returns an array of tags', function () {
      const set = new TagSet(tags);
      expect(set.tags).to.be.an('array');
      for (const tag of set.tags) {
        expect(tag).to.be.instanceOf(Tag);
      }
    });
  });

  describe('.get()', function () {
    it('finds an tag by name', function () {
      const set = new TagSet(tags);
      expect(set.get('em')).to.be.instanceOf(Tag);
      expect(set.get('em').name).to.equal('em');
    });

    it('returns undefined if no matching tag is found', function () {
      const set = new TagSet(tags);
      expect(set.get('foo')).to.equal(undefined);
    });
  });
});
