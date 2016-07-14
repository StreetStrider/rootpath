# rootpath
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
new Rootpath(), Rootpath() -- rootpath with process.cwd() root.
new Rootpath(path, ...), Rootpath(path, ...) -- rootpath with given path root.

rootpath.resolve(path, ...), rootpath(path, ...) -- resolve paths relative to root.

rootpath.partial(path, ...) -- create new rootpath relative to root + given path.
```

# license
MIT. © StreetStrider, 2013 — 2016.
