# Migrating from 0.x.x to 1.x.x

There are several significant changes from 0.x.x to 1.x.x:
* Breaking: Protocol-Common is now published as an ESModule library.
* Breaking: Minimum node version supported is node 16.
* Breaking: The underlying logging mechanism (Winston) has been swapped out for Pino logger.
* Breaking: Protocol-Common now provides shallow-imports and does not support deep imports.
* Breaking: New ProtocolHttpService implementation.

## Protocol-Common is now published as an ESModule library.

This has a few downstream effects for clients of Protocol-Common. Most importantly:
1. Make sure your package.json specifies `"type": "module"`
2. Make sure all imports of local components use the `.js` extension. This does not apply to components imported from
   external sources (e.g. modules imported from npm).

To make sure that this behavior is enforced in future updates to the codebase, we recommend adding the following rule
to your `.eslint.json` configuration file:
```
"import/extensions": [
    "error",
    {
        "js": "ignorePackages",
        "json": "ignorePackages"
    }
]
```

### Jest + ESM

Because our package is now exported as an ESModule, there may be some new and weird error messages you see if you use
Jest for running unit tests in your own TypeScript application. Fear not! Here's how you can support ESM imports with
TypeScript in Jest.

1. If you have not already, install the `ts-jest` package as a dev dependency.
```
npm install --save-dev ts-jest
```
2. Add the following to your Jest configuration:
```
"globals": {
    "ts-jest": {
        "useESM": true
    }
},
"extensionsToTreatAsEsm": [
    ".ts"
]
```
3. Be sure to add the `--experimental-vm-modules` flag to your Node environment prior to running Jest. You can read
   [more about ESM support in Jest here](https://jestjs.io/docs/ecmascript-modules).
```
"scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
}
```

## Minimum node version supported is node 16.

In particular, this is true if you are importing any `.json` files in your application. If you are doing so, you need to
add an assertion to your import line. This will likely cause a typescript error, so you'll also need to use a @ts-ignore
flag. E.g.

```
// @ts-ignore: assertions are currently required when importing json
import data from '../config/env.json' assert { type: 'json'};
```

See the documentation here for more information: [https://nodejs.org/docs/latest-v16.x/api/esm.html#json-modules](https://nodejs.org/docs/latest-v16.x/api/esm.html#json-modules)

### Getting an eslint error now?

Add this rule to your `.eslint.json` file:

```
"@typescript-eslint/ban-ts-comment": [
    "error",
    {
        "ts-ignore": "allow-with-description"
    }
]
```

## The underlying logging mechanism has been swapped out for Pino logger.

To use the new Logger you need to do 3 things:
1. Add `ProtocolLoggerModule` to your module imports in `app.module.ts` (or wherever your top-level module is)
2. At application start-up time, after loading your top-level module, use `ProtocolLogger` as your app logger:
```
app.useLogger(app.get(ProtocolLogger));
```
3. Anywhere you want to use the logger, import the default Nest Logger and use that:
```
import { Logger } from '@nestjs/common';
```

### Logger.info() -> Logger.log()

Note that if you were using the previous Logger provided by this library, you might be using a `.info()` function.
Unfortunately, that function does not exist on the default Nest Logger. Instead, use `.log()`

## Protocol-Common now provides shallow-imports and does not support deep imports.

When importing from protocol-common, import everything from the top level (except for validations, which has a different
top-level import).

E.g.
```
import { HttpConstants } from 'protocol-common/http-context/http.constants'; // DON'T DO THIS!
import { HttpConstants } from 'protocol-common'; // THIS IS GOOD!

import { ProtocolValidationPipe } from 'protocol-common/validation/protocol.validation.pipe'; // DON'T DO THIS!
import { ProtocolValidationPipe } from 'protocol-common/validation'; // THIS IS GOOD!
```

## New ProtocolHttpService implementation.

1. Delete any dependency on `@nestjs/axios` from your `package.json`
2. Anywhere you were importing `HttpModule` from `@nestjs/axios` or `@nestjs/common`, now import `ProtocolHttpModule`
   from protocol-common.
3. Instead of manually creating a ProtocolHttpService, you can now just add it to the constructor and rely on NestJS's
   dependency injection system.
