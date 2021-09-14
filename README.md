# Using protocol-common
Protocol-common is a shared library of commonly used functions in protocol web services such as 
[Aries-Guardianship-Agency](https://github.com/kiva/aries-guardianship-agency).  

Protocol-common is distributed through [npm packages](https://www.npmjs.com/package/protocol-common). 
Please use NPM package for your work.

# Contributing to protocol-common
## Getting Started
Typically you'll need to update this repo when you want to change code that's shared among multiple services.
1. Create a branch named after the Jira ticket you're working on (e.g. PRO-2000)
2. Make your code changes
3. Update the "version" in package.json using Major.Minor.Patch semantic versioning
4. Commit your change to the branch and create a new PR in github
5. Once approved and merged CD will automatically create an npm package at the version number you specified
6. (optional) Update repos that consume protocol-common.  

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
