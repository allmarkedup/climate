const {compact, defaultsDeep} = require('lodash');
const chalk = require('chalk');
const Tokenizer = require('html-tokenizer');
const entities = require('html-tokenizer/entity-map');
const {assert} = require('check-types');
const stripIndent = require('strip-indent');
const config = require('./config');
const TagSet = require('./tag-set');
const {Token, TagToken, TextToken} = require('./token');

const {OPEN, CLOSE} = Token;

function tokenize(str, opts = {}) {
  const tokenizer = new Tokenizer({entities});
  const tags = new TagSet(defaultsDeep(opts.tags, config.tags));

  let tokens = [];

  tokenizer.on('opening-tag', function (name) {
    const tag = tags.get(name);
    tokens.push(tag ? new TagToken(tag, 'open') : new TextToken(`<${name}>`));
  });

  tokenizer.on('closing-tag', function (name) {
    const tag = tags.get(name);
    tokens.push(tag ? new TagToken(tag, 'close') : new TextToken(`</${name}>`));
  });

  tokenizer.on('text', text => {
    tokens.push(new TextToken(text));
  });

  tokenizer.tokenize(stripWhitespace(str).replace(/^[\r\n]+/, '').replace(/[\r\n]+\s*?$/, ''));

  return tokens;
}

function stripWhitespace(str) {
  return stripIndent(str);
}

function generateOutput(tokens) {
  const stack = [];
  const output = [];

  tokens.forEach((current, i, tokens) => {
    if (current.type === OPEN) {
      stack.push(current);
    }
    if (current.type === CLOSE) {
      stack.pop();
    }
    output.push(current.content(stack));
  });

  return compact(output).join('');
}

function render(str, opts = {}) {
  assert.string(str, `Console string parser input must be a string [input-invalid]`);

  const tokens = tokenize(str, opts);
  const output = generateOutput(tokens);

  const rendered = Function(['chalk'], 'return chalk`' + output + '`')(chalk); // eslint-disable-line no-new-func
  return rendered;
}

module.exports = render;
module.exports.render = render;
module.exports.tokenize = tokenize;
module.exports.generateOutput = generateOutput;
module.exports.stripWhitespace = stripWhitespace;
