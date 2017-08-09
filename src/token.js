const {trimStart, trimEnd} = require('lodash');
const stripIndent = require('strip-indent');
const Tag = require('./tag');

class Token {}

Token.INLINE_OPEN = 'inline-open';
Token.INLINE_CLOSE = 'inline-close';
Token.BLOCK_OPEN = 'block-open';
Token.BLOCK_CLOSE = 'block-close';
Token.TEXT = 'text';

class TextToken extends Token {

  constructor(text) {
    super();
    this.text = text;
    this.type = Token.TEXT;
  }

  trimStart() {
    this.text = trimStart(this.text);
  }

  trimEnd() {
    this.text = trimEnd(this.text);
  }

  stripIndent() {
    this.text = stripIndent(this.text).replace(/\n/g, '%BR%');
  }

  condenseWhitespace() {
    this.text = this.text.replace(new RegExp(`\\s*%BR%\\s*`, 'g'), '%BR%');
    this.text = this.text.replace(/\n*/g, '');
    this.text = this.text.replace(/\s{2,}/g, ' ');
  }

  content(stack) {
    return this.text;
  }

}

class TagToken extends Token {

  constructor(tag, pos) {
    super();
    if (!(tag instanceof Tag)) {
      throw new Error(`tag argument must be a Tag instance [tag-invalid]`);
    }
    if (tag.display !== 'block' && tag.display !== 'inline') {
      throw new Error(`Unknown display type '${tag.display}' [display-invalid]`);
    }
    if (pos !== 'open' && pos !== 'close') {
      throw new Error(`Unknown token position ${pos} [position-invalid]`);
    }
    this.tag = tag;
    this.type = `${tag.display}-${pos}`;
  }

  content(stack) {
    if (this.type === Token.INLINE_OPEN || this.type === Token.BLOCK_OPEN) {
      return this.tag.open(stack);
    }
    return this.tag.close(stack);
  }

}

module.exports = {Token, TextToken, TagToken};
