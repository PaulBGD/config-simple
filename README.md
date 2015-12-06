# Config Simple
An easy configuration module for Node.

## Installation
```bash
npm install --save simple-config
```

## Usage

#### JavaScript

```js
var Config = require('config-simple');
var config = new Config('config'); // the directory of your configuration

var someValue = config.data().value;
```

#### TypeScript

```ts
import Config from 'config-simple';

interface ConfigData {
    value: string;
}

let config: Config<ConfigData> = new Config<ConfigData>('config'); // the directory of your configuration

let someValue: string = config.data().value;
```

### File Extensions
Additionally, you can pass one of the following extensions to the Config constructor to use a different type of file:

- json (default)
- js
- yaml/yml
- json5

### File Order
First a file called default.json (or your other extension) will be used.

After that, we'll look for for the `process.env.NODE_ENV`.json file and override the defaults using it.

## Contributing

This project is licensed under MIT, and we're openly accepting contributions. However, PRs to master will only be accepted in TypeScript. If you don't understand TypeScript but still have a great idea, please create an Issue.
