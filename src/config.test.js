const {expect} = require('chai');
const {tags} = require('./config');

const tagNames = [
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
  'bgWhiteBright',
  'pre',
  'br',
  'div',
  'ul',
  'li',
  'span',
  'em',
  'strong',
  'message',
  'success',
  'warning',
  'error',
  'details',
  'section'
];

describe('config', function () {
  it('has the expected tags', function () {
    expect(Object.keys(tags).sort()).to.eql(tagNames.sort());
  });
});
