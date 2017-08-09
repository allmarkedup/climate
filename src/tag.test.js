const {expect} = require('chai');
const Tag = require('./tag');

const styleProps = {
  color: 'red',
  bgColor: 'green',
  style: 'bold'
};

describe('Tag', function () {
  describe('constructor', function () {
    it('sets a name property from the first argument', function () {
      const tag = new Tag('foo');
      expect(tag.name).to.equal('foo');
    });

    it('sets the configuration values', function () {
      const config = {open: 'bar'};
      const tag = new Tag('foo', config);
      expect(tag.config).to.equal(config);
    });
  });

  describe('.close()', function () {
    it('returns a string with the a closing brace for each style config prop', function () {
      const tag = new Tag('foo', styleProps);
      expect(tag.close()).to.equal('}}}');
    });
  });

  describe('.open()', function () {
    it('returns a string', function () {
      const tag = new Tag('foo');
      expect(tag.open()).to.be.a('string');
    });
    it('appends chalk-style formatting open tags for each style config prop', function () {
      const tag = new Tag('foo', styleProps);
      const result = tag.open();
      expect(result.indexOf(`{red `)).to.be.above(-1);
      expect(result.indexOf(`{bgGreen `)).to.be.above(-1);
      expect(result.indexOf(`{bold `)).to.be.above(-1);
    });
  });

  describe('.display', function () {
    it('returns the display value set in the config', function () {
      const tag = new Tag('bar', {display: 'block'});
      expect(tag.display).to.equal('block');
    });
    it('defaults to `inline` if not set in config', function () {
      const tag = new Tag('bar');
      expect(tag.display).to.equal('inline');
    });
  });

  describe('.preformatted', function () {
    it('returns the preformatted value set in the config', function () {
      const tag = new Tag('bar', {preformatted: true});
      expect(tag.preformatted).to.equal(true);
    });
    it('defaults to false if not set in config', function () {
      const tag = new Tag('bar');
      expect(tag.preformatted).to.equal(false);
    });
  });

  describe('.config', function () {
    it('returns the configuration object', function () {
      const tag = new Tag('foo');
      expect(tag.config).to.be.an('object');
      const tag2 = new Tag('bar', {test: 'foo'});
      expect(tag2.config).to.be.an('object');
    });
  });
});
