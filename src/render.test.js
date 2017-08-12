const chalk = require('chalk');
const {expect} = require('chai');
const {render} = require('./render');

const styleTags = [
  'reset',
  'bold',
  'dim',
  'italic',
  'underline',
  'inverse',
  'hidden',
  'strikethrough',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
  'bgBlackBright',
  'bgRedBright',
  'bgGreenBright',
  'bgYellowBright',
  'bgBlueBright',
  'bgMagentaBright',
  'bgCyanBright',
  'bgWhiteBright'
];

function renderWithChalk(str, style) {
  return style ? chalk[style](str) : str;
}

describe('renderer', function () {
  describe('default export', function () {
    it('is the render function', function () {
      expect(require('./render')).to.equal(render);
    });
  });

  describe('.render()', function () {
    it('throws an error on invalid input', function () {
      for (const input of [null, undefined, {}, function () {}]) {
        expect(() => render(input)).to.throw(TypeError);
      }
    });

    it('returns a string', function () {
      expect(render(`<bold>foo</bold>`)).to.be.a('string');
    });

    it('renders style tags', function () {
      for (const tag of styleTags) {
        expect(render(`<${tag}>foo</${tag}>`)).to.equal(renderWithChalk('foo', tag));
      }
    });

    it('ignores unknown tags', function () {
      const result = render('<baz>foo</baz>');
      expect(result).to.equal(renderWithChalk('<baz>foo</baz>'));
    });

    it('strips leading and following new lines', function () {
      const expected = renderWithChalk('foo');
      expect(render(`\n\nfoo\n\n`)).to.equal(expected);
    });

    it('allows custom tags to be supplied as an option', function () {
      const result = render('foo<bar>baz</bar>', {
        tags: {
          bar: {
            color: 'red'
          }
        }
      });
      expect(result).to.equal(renderWithChalk(`foo${chalk.red('baz')}`));
    });
  });
});
