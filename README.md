# rootpath [![Travis](https://img.shields.io/travis/StreetStrider/rootpath.svg?style=flat-square)](https://travis-ci.org/StreetStrider/rootpath) [![Coveralls](https://img.shields.io/coveralls/StreetStrider/rootpath.svg?style=flat-square)](https://coveralls.io/github/StreetStrider/rootpath) [![MIT licensed](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](#license)

Address Node.js project's files relatively to project's root.

# usage
```sh
project/
  cfg/
    config.json
  src/
    App.js
```

App.js:
```javascript
var
    Rootpath = require('rootpath');

function App ()
{
  /* with rootpath */
  this.rootpath = new Rootpath(__dirname, '..');

  /* you can do this: */
  this.config   = require(this.roopath.resolve('cfg', 'config.json');

  /* or */
  this.config   = require(this.roopath.resolve([ 'cfg', 'config.json' ]);

  /* or */
  this.config   = require(this.roopath.resolve('cfg/config.json');

  /* or even simpler */
  this.config   = require(this.rootpath('cfg/config.json'));

  /* pass concretized rootpaths to subcomponents: */
  this.someModel = new SomeModel(this.rootpath.partial('data/model'));

  /* get path in space of rootpath */
  var relpath = this.rootpath.relative(some_abspath)
}
```

# install
[The registry](http://npmjs.org/) already has another package `rootpath`. So, to install this package one must use GitHub-shortcut:
```
npm install StreetStrider/rootpath
```

# API
Behavior of function is similar to std `path#resolve`. In addition it also flattens any arrays found in arguments. It will resolve path relative to `process.cwd()` if path would not absolute after all computations.

```javascript
// rootpath with process.cwd() root.
new Rootpath(), Rootpath()

// rootpath with given path root
new Rootpath(path, ...), Rootpath(path, ...)

// resolve paths relative to root
rootpath.resolve(path, ...), rootpath(path, ...)

// create new rootpath relative to root + given path
rootpath.partial(path, ...)

// get relative path from root
rootpath.relative(path)

// root path of instance can be received via String/toString
var base = String(rootpath)

// one instance can be directly used as base for another
var rootpath = Rootpath(another_rootpath, 'some/path')
```

# license
MIT. © StreetStrider, 2013 — 2016.
