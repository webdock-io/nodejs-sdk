# webdock

[![NPM](https://badgen.net/npm/v/webdock)](https://www.npmjs.com/package/webdock)

> NodeJS SDK Library / Wrapper for the Webdock API

## Installation

```
npm install webdock
```

## Usage
```js
const { OpenAPI } = require('webdock');
const WebdockApi = require('webdock/services');

OpenAPI.TOKEN = 'Your_token_goes_here'

const main = async () => {
    const ping = await WebdockApi.PingService.getPing()
    console.log(ping); // { webdock: 'rocks' }

    const servers = await WebdockApi.ServersService.getServers();
    console.log(servers);
}

main();
```