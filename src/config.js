const figures = require('figures');

const tags = {

  br: {
    open: '\n',
    close: false
  },

  li: {
    bullet: '*'
  },

  em: {
    style: 'italic'
  },

  strong: {
    style: 'bold'
  },

  success: {
    bullet: figures.tick,
    color: 'green'
  },

  warning: {
    bullet: figures.warning,
    color: 'yellow'
  },

  error: {
    bullet: figures.cross,
    color: 'red'
  },

  debug: {
    color: 'dim'
  },

  hr: {
    color: 'dim',
    open: '---',
    close: false
  }

};

const styles = [
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

styles.forEach(name => {
  tags[name] = {
    display: 'inline',
    open: `{${name} `,
    close: '}'
  };
});

module.exports = {tags};
