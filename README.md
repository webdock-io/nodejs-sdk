# @webdock/sdk

A type-safe wrapper for the Webdock.io API.

## Documentation

Full API documentation is available at [api.webdock.io](https://api.webdock.io)

## Installation

```bash
npm install @webdock/sdk
```

```bash
pnpm install @webdock/sdk
```

```bash
bun install @webdock/sdk
```

## Error Handling Philosophy

We don't like throwing errors, and to be honest, neither should you. That's why we designed this package with Go-style error handling:

```ts
import { Webdock } from "@webdock/sdk"

async function main() {
    const client = new Webdock("your-token-here")
    const accountInfo = await client.account.info()
    
    if (accountInfo.success) {
        console.log(accountInfo.response.body.userId)
    } else {
        console.error("Failed to fetch account info:", accountInfo.error)
    }
}

main()
```

## Quick Start

```ts
import { Webdock } from "@webdock/sdk"

const client = new Webdock("your-token-here")

// Example usage with error handling
const servers = await client.servers.list()
if (servers.success) {
    console.log("Servers:", servers.response.body)
} else {
    console.error("Error:", servers.error)
}
```

## TypeScript Configuration

This package is designed for modern TypeScript projects:

- **ES Modules**: Works out of the box with `"type": "module"` in your `package.json`
- **CommonJS**: If using `"type": "commonjs"`, add `"verbatimModuleSyntax": false` to your `tsconfig.json`

```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": false
  }
}
```

## Backward Compatibility

The legacy package is still available but deprecated. You can import it for existing projects:

```ts
import { oldWebdock } from "@webdock/sdk"

const pong = await oldWebdock.PingService.getPing()
```

> **Note**: The [old package](https://github.com/webdock-io/nodejs-sdk) is now deprecated. Please migrate to the new SDK for continued support and updates.

