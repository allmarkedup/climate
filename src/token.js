const Tag = require('./tag');

class Token {}

Token.OPEN = 'open';
Token.CLOSE = 'close';
Token.TEXT = 'text';

class TextToken extends Token {

  constructor(text) {
    super();
    this.text = text;
    this.type = Token.TEXT;
  }

  content(stack) {
    return this.text;
  }

}

class TagToken extends Token {

  constructor(tag, type) {
    super();
    if (!(tag instanceof Tag)) {
      throw new Error(`tag argument must be a Tag instance [tag-invalid]`);
    }
    if (!['open', 'close'].includes(type)) {
      throw new Error(`Unknown token position ${type} [position-invalid]`);
    }
    this.tag = tag;
    this.type = type;
  }

  content(stack) {
    return this.type === Token.OPEN ? this.tag.open(stack) : this.tag.close(stack);
  }

}

module.exports = {Token, TextToken, TagToken};
