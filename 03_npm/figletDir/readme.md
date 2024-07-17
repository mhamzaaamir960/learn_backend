## node_modules

- Node modules are used to store pakages code or data which we install through npm.These pakages are essential for the project's functionality and include libraries and tools that the project depends on.

## pakage-lock.json

- In pakage lock json file all pakages which is installed in the project this file locks the version of pakages in the project and preventing potential issues caused by version discrepancies.

## pakage.json

- In pakage json file all meta data about project like dependecies and license. The big benfit of this file is saved all pakages name and versions which is helpful when we clone any project from github or start work any previous project where node modules are not installed. if pakages json exists in the project we easily install the pakages code in node modules simply run command (npm i or npm install).

### commands

- `npm init` => create pakage.json file
- `npm install` => node_modules
- `npm install <pakage name>` => for install pakages


## import/export

- **import/export** is the modern way to write javascript code to export and import code in files and folders instead of **require and module.exports**. **ECMAscript 6 (European Computer Manufactures Association)** the *international Standard for Scripting Languages*. They standarized the module javascipt and initiate new more features like arrow functions and many more improvements. **import/export** supports the asychronous loading means the code which is time taken and it is not blocked the other code execution or compilation.
- For using **import/export** which is module javascript we must use the .`.mjs` file extension or add `"type": "module"` in pakage.json file.
- For common js it is by default. if use manually we use the `.cjs` file extesion or add `"type": "commonjs"` in pakage.json file.
