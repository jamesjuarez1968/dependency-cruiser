# FAQ

## How do I enable TypeScript, CoffeeScript or LiveScript in dependency-cruiser?
You don't. They work out of the box.

## Does this mean dependency-cruiser installs transpilers for all these languages?
No.

For LiveScript, TypeScript and CoffeeScript dependency-cruiser will use the
transpiler already in your project (or, if you installed dependency-cruiser
globally - the transpilers available globally).

This has a few advantages over bundling the transpilers as dependencies:
- `npm i`-ing dependency-cruiser will be faster.
- Transpilers you don't need won't land on your disk.
- Dependency-cruiser will use the version of the transpiler you are using
  in your project (which might not be the most recent one for valid reasons).

## How do I add support for my favorite alt-js language?
Ask me nicely.

Dependency-cruiser already supports TypeScript, CoffeeScript and LiveScript. If
there's another language (that transpiles to javascript) you'd like to see
support for, let me know.

... or add it yourself: your pull request is welcome. Recipe:
- In `package.json`:
  - add your language (and supported version range) to the `supportedTranspilers`
    object.
  - Add your language's transpiler to `devDependencies` (you'll need that,
    because you are going to write tests that prove the addition works
    correctly later on).
- In `src/transpile`
  - add a `yourLanguageWrap.js` that invokes the transpiler transforming
    your language into javascript (preferably ES6 or better, but lower versions
    should work as well). [`typeScriptWrap.js`](../src/extract/transpile/typeScriptWrap.js)
    as an example on how to do this.
  - in [`meta.js`](../src/extract/transpile/meta.js)
    - require `./yourLanguageWrap` and
    - add it to the `extension2wrapper` object with the extensions proper for your
    language.
- In `test/extract/transpile` add unit tests for `yourLanguageWrap`

## How do I add a new output format?

Like so:
- In `src/report`:
  - add a module that exports a default function that
    - takes a dependency cruiser output object
      ([json schema](../src/extract/jsonschema.json))
    - returns that same object with the values of the 'dependencies' attribute
      replaced by the string containing the output you want.
- In `main/index.js`
    - require that module and
    - add a key to the to the `TYPE2REPORTER` object with that module as value
- In `bin/dependency-cruise`
    - add it to the documentation of the -T option
- In `test/report` add unit tests that proves your reporter does what it
    intends.
