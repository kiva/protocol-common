# Using protocol-common

Protocol-common is a shared library of commonly used functions in protocol web services such as 
[Aries-Guardianship-Agency](https://github.com/kiva/aries-guardianship-agency).

Protocol-common is distributed through [npm packages](https://www.npmjs.com/package/protocol-common). Please use this
npm package for your work.

## Using protocol-common locally

If you'd like to use a local version of protocol-common instead of the version available through npm packages, we've
added some handy scripts to help you do so.
1. In protocol-common, run the command `npm run setup`
    - This will compile your code into a dist/ directory and use the [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link)
      utility to create a local symlink to that dist/ directory.
2. In the project that will use protocol-common, run the command `npm link protocol-common`.
3. Try it out!

When you're finished, run the following commands in order to undo the local link:
1. In the project that is using protocol-common, run the command `npm unlink protocol-common --no-save`
    - Note that now you will not have any protocol-common dependency installed, so you may want to pull down the remote
      version again by running `npm install`.
2. In protocol-common, run the command `npm run teardown`

# Contributing to protocol-common

## Getting Started

Typically, you'll need to update this repo when you want to change code that's shared among multiple services.
1. Create a branch.
2. Make your code changes.
3. (optional) Test your changes by using protocol-common locally with some other project that depends on it.
4. Update the "version" in package.json using Major.Minor.Patch semantic versioning.
5. Commit your change to the branch and create a new PR in Github.
6. Once approved and merged, CircleCI will automatically push an npm package with the version number you specified.
7. (optional) Update repos that consume protocol-common.

## notes

[github info](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)  
[npm package how-to](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)  
[using experimental features in packages](https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff)

# Library Documentation

## Config Module data format

To use the ConfigModule, data needs to be passed in.  The data needs to be a specific format.  This is an example of that format.

```
{
     "default": {
       "SERVICE_NAME": "authservice"
     },
     "local": {
       "WALLET_SYNC_SERVICE_URL": "http://protocol-wallet-sync-service:3004",
       "IDENTITY_SERVICE_URL": "http://protocol-identity-service:8080",
       "IDENTITY_SERVICE_BACKEND": "ncratemplate",
       "MAX_LOG_LENGTH": 5000,
       "JAEGER_ENDPOINT": "http://jaeger:14268/api/traces",
       "JWT_EXPIRE_SECONDS": 36000,
       "TRACER": "",
       "RESTFUL_CLIENT_DELAY": 250,
       "RESTFUL_CLIENT_RETRY": 5
     },
     "dev": {},
     "qa": {},
     "sand": {},
     "prod": {}
   }
```
