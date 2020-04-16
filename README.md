# protocol-common
Common code for protocol web services.  Please use NPM package for your work.

# Getting Started
Typically you'll need to update this repo when you want to change code that's shared among multiple services.
1. Create a branch named after the Jira ticket you're working on (e.g. PRO-2000)
2. Make your code changes
3. Update the "version" in package.json using Major.Minor.Patch semantic versioning
4. Commit your change to the branch and create a new PR in github
5. Once approved and merged CD will automatically create an npm package at the version number you specified
6. In the main protocol repo you can either update an individual service by setting the "@kiva/protocol-common" version,
   or more likely you'll want to update all the services using ./script/updateProtocolCommon.sh
   Note: you need to go into the updateProtocolCommon.sh file first and manually set the version you want things updated to

# Manual Building & Publishing
(Note: only run the below steps if you want to manually build a package, generally it's better just to let CD do it)
1. Make sure node version matches node version used in protocol docker images.  Currently this is v8.12.0.
2. Pull from master branch.
3. update version number in package.json 
4. run `npm run build`.
5. run script publish.sh.
6. check in package.json

## notes
[github info](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)  
[npm package how-to](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)  
[using experimental features in packages](https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff)
