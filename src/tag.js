const {capitalize} = require('lodash');

const _config = new WeakMap();

class Tag {

  constructor(name, config = {}) {
    this.name = name;
    _config.set(this, config);
  }

  open(stack) {
    const config = this.config;
    let open = '';

    if (config.color) {
      open += `{${config.color} `;
    }

    if (config.bgColor) {
      open += `{bg${capitalize(config.bgColor)} `;
    }

    if (config.style) {
      open += `{${config.style} `;
    }

    if (config.bullet) {
      open += `${config.bullet} `;
    }

    open += config.open || '';

    if (config.close === false) {
      for (const prop of ['color', 'style', 'bgColor']) {
        if (this.config[prop]) {
          open += `}`;
        }
      }
    }

    return open;
  }

  close() {
    let close = this.config.close;
    if (close === false) {
      return;
    }
    close = close || '';
    for (const prop of ['color', 'style', 'bgColor']) {
      if (this.config[prop]) {
        close += `}`;
      }
    }
    return close;
  }

  get config() {
    return _config.get(this);
  }

}

module.exports = Tag;
