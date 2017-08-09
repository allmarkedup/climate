const {compact, defaultsDeep} = require('lodash');
const chalk = require('chalk');
const Tokenizer = require('html-tokenizer');
const entities = require('html-tokenizer/entity-map');
const {assert} = require('check-types');
const config = require('./config');
const TagSet = require('./tag-set');
const {Token, TagToken, TextToken} = require('./token');

const {INLINE_OPEN, INLINE_CLOSE, BLOCK_OPEN, BLOCK_CLOSE, TEXT} = Token;
const LINEBREAK = '%BR%';

function tokenize(str, opts = {}) {
  const tokenizer = new Tokenizer({entities});
  const tags = new TagSet(defaultsDeep(opts.tags, config.tags));

  let tokens = [];

  tokenizer.on('opening-tag', function (name) {
    const tag = tags.get(name);
    if (tag) {
      tokens.push(new TagToken(tag, 'open'));
    } else {
      tokens.push(new TextToken(`<${name}>`));
    }
  });

  tokenizer.on('closing-tag', function (name) {
    const tag = tags.get(name);
    if (tag) {
      tokens.push(new TagToken(tag, 'close'));
    } else {
      tokens.push(new TextToken(`</${name}>`));
    }
  });

  tokenizer.on('text', text => {
    tokens.push(new TextToken(text));
  });

  tokenizer.tokenize(str.replace('<br>', LINEBREAK));

  return tokens;
}

function collapseWhitespace(tokens) {
  let preformatted = false;

  tokens = tokens.map((current, i, tokens) => {
    const previous = tokens[i - 1] ? tokens[i - 1].type : null;
    const next = tokens[i + 1] ? tokens[i + 1].type : null;

    const {tag, type} = current;

    if (type === BLOCK_OPEN && tag.preformatted) {
      preformatted = true;
    }

    if (type === BLOCK_CLOSE && tag.preformatted) {
      preformatted = false;
    }

    if (current.type === TEXT) {
      if (preformatted) {
        current.stripIndent();
      } else {
        current.condenseWhitespace();
        if (previous !== INLINE_CLOSE) {
          current.trimStart();
        }
        if (next !== BLOCK_OPEN && next !== INLINE_OPEN) {
          current.trimEnd();
        }
      }
    }

    return current;
  });

  tokens = tokens.filter(token => token.content !== '');

  return tokens;
}

function generateOutput(tokens) {
  const stack = [];
  const output = [];

  tokens.forEach((current, i, tokens) => {
    const previous = tokens[i - 1] ? tokens[i - 1].type : null;

    if (current.type === BLOCK_OPEN) {
      if ([BLOCK_CLOSE, INLINE_CLOSE, TEXT].includes(previous)) {
        output.push(LINEBREAK);
      }
      stack.push(current);
    }

    if (current.type === INLINE_OPEN) {
      if (previous === BLOCK_CLOSE) {
        output.push(LINEBREAK);
      }
      stack.push(current);
    }

    if (current.type === BLOCK_CLOSE || current.type === INLINE_CLOSE) {
      stack.pop();
    }

    if (current.type === TEXT && previous === BLOCK_CLOSE) {
      output.push(LINEBREAK);
    }

    output.push(current.content(stack));
  });

  return compact(output).join('');
}

function render(str, opts = {}) {
  assert.string(str, `Console string parser input must be a string [input-invalid]`);

  const tokens = collapseWhitespace(tokenize(str, opts));
  const output = generateOutput(tokens);

  const rendered = Function(['chalk'], 'return chalk`' + output + '`')(chalk); // eslint-disable-line no-new-func
  return rendered.replace(new RegExp(LINEBREAK, 'g'), '\n');
}

module.exports = render;
module.exports.render = render;
module.exports.tokenize = tokenize;
module.exports.generateOutput = generateOutput;
module.exports.collapseWhitespace = collapseWhitespace;
