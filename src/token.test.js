const {expect} = require('chai');
const Tag = require('./tag');
const {Token, TagToken} = require('./token');

describe('Token', function () {
  it('exports a static set of unique token types', function () {
    const used = [];
    for (const type of ['OPEN', 'CLOSE', 'TEXT']) {
      expect(Token[type]).to.be.a('string');
      expect(used.includes(type)).to.equal(false);
      used.push(type);
    }
  });
});

describe('TagToken', function () {
  it('extends Token', function () {
    const token = new TagToken(new Tag('foo'), 'open');
    expect(token).to.be.instanceOf(Token);
  });

  describe('constructor()', function () {
    it('throws an error if a Tag is not provided', function () {
      expect(() => new TagToken(), 'open').to.throw('[tag-invalid]');
      expect(() => new TagToken('foo'), 'open').to.throw('[tag-invalid]');
      expect(() => new TagToken({}), 'open').to.throw('[tag-invalid]');
    });
    it('throws an error if the position is not valid', function () {
      expect(() => new TagToken(new Tag('foo'), 'bar')).to.throw('[position-invalid]');
    });
  });
});
