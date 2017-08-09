# Climate

Generate styled terminal output using a markup-style syntax.

## Installation

```
npm i @allmarkedup/climate
```

## Usage

```js
const climate = require('@allmarkedup/climate');

const output = climate(`
  <bold>This is a message</bold>.
  You can use <green>markup-style tags<green> to style the output.
`);

console.log(output);
```

## Requirements

Requires Node >= v7.6
