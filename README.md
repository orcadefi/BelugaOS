# Orca OS

OrcaOS Project

## Summary

This projects automatically deploys change on "Landing" branch

## Installation

### Requeriments

* npm

### Steps

~~~
npm install
npm start
~~~

## Additional Information

### Adding windows

1. In order to add a Window to the project you may need to add it into the *__./src/Components/Constant.jsx__* at the **const** variable as the others

2. For adding a new Icon, you just need to add the needed information in the **images** variable as the others

### Typescript Bug

There is a bug on the typescript package version that you may need to repair in order to start the proyect, is a Typo problem that have an error while parsing data, to solve this you just need to:

1. Open node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js

2. Change this:

~~~
    jsx: {
      parsedValue:
        hasJsxRuntime && semver.gte(ts.version, '4.1.0-beta')
          ? ts.JsxEmit.ReactJsx
          : ts.JsxEmit.React,
~~~

into this:

~~~
    jsx: {
      parsedValue:
        hasJsxRuntime && semver.gte(ts.version, '4.1.0-beta')
          ? ts.JsxEmit.ReactJSX
          : ts.JsxEmit.React,
~~~

and there will be solved.

More information of this bug on: https://github.com/facebook/create-react-app/issues/9868