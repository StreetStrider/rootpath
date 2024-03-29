# rootpath

[![ISC licensed](http://img.shields.io/badge/license-ISC-brightgreen.svg?style=flat-square)](#license)
[![typescript](http://img.shields.io/badge/type-script-0074C1.svg?style=flat-square)](#types)
[![npm|@streetstrider/rootpath](http://img.shields.io/badge/npm-@streetstrider/rootpath-CB3837.svg?style=flat-square)](https://www.npmjs.org/package/@streetstrider/rootpath)

Address Node.js project's files relatively to project's root.

## usage
Consider the following structure:

```sh
project/
  cfg/
    config.json
  src/
    App.js
```

If you want to address config from App you could use composition of `__dirname`, path joining and relative paths. This becomes messy and uncontrollable very quickly. There's a place for an abstraction which would encapsulate point in fs hierarchy and allow to construct paths and address files in clean and easy manner.

App.js:
```javascript
import rootpath from '@streetstrider/rootpath'

function App ()
{
  /* with rootpath: */
  this.fromroot = rootpath()
  /*
   * which means: "pinpoint project's root directory (where package.json)."
   */

  /* it is also possible to supply path or path segments manually */
  this.fromroot = rootpath(__dirname, '..')
  /* or */
  this.fromroot = rootpath([ __dirname, '..' ])
  /* or */
  this.fromroot = rootpath(__dirname + '/..')
  /* or in ESM you can take pinpoint dirname of import.meta.url's path */
  /* file:/// is handled correctly */
  this.fromroot = rootpath(import.meta.url)

  /* on this point `fromroot` becomes a pivot for addressing */
  this.config = load(this.fromroot('cfg', 'config.json'))
  /* or */
  this.config = load(this.fromroot([ 'cfg', 'config.json' ]))
  /* or */
  this.config = load(this.fromroot('cfg/config.json'))

  /* you also can use `rootpath#resolve` as an explicit analogue */
  this.config   = load(this.fromroot.resolve('cfg', 'config.json')

  /* if you need to create concretized view onto fs, use `rootpath#partial`: */
  this.someModel = new SomeModel(this.fromroot.partial('data/model'))
  /* this creates new instance of rootpath, focused on `data/model` */

  /* get path in the space of rootpath */
  const relpath = this.fromroot.relative(some_abspath)

  /* check if some path is not above rootpath */
  this.fromroot.contains(some_path)

  /* assert that some path not above rootpath */
  this.fromroot.guard(some_path)

  /* map paths iterable over rootpath */
  this.fromroot.over(paths)
}
```

## install
```
npm install @streetstrider/rootpath
```

## API
Behavior of this module is similar to std's `path#resolve`. In addition it also flattens any arrays found in arguments. It will resolve path relative to `process.cwd()` if path would not be absolute after all computations. This also include glob support and glob negation.

```javascript
// rootpath with package root or process.cwd() if not inside package.
// any path may be also a glob, including negative glob
new Rootpath(), Rootpath()

// rootpath with given path root
new Rootpath(path, ...), Rootpath(path, ...)

// resolve paths relative to root
rootpath.resolve(path, ...), rootpath(path, ...)

// create new rootpath relative to root + given path
rootpath.partial(path, ...)

// get relative path from root
rootpath.relative(path)

// does this rootpath contains path as a subpath
roootpath.contains(path)

// root path of instance can be received via String/toString
const base = String(rootpath)

// one instance can be directly used as base for another
const rootpath = Rootpath(another_rootpath, 'some/path')
```

## types
We're providing built-in [TypeScript](http://typescriptlang.org/) & [Flow](https://flowtype.org/) type definitions.

## license
ISC. © Strider, 2013 — 2024.
