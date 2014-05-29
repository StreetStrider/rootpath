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
  this.config   = require(this.roopath.resolve('cfg/config.json');

  /* or even simpler */
  this.config   = require(this.rootpath('cfg/config.json'));
}
```

# license
MIT. © StreetStrider, 2013 — 2014.
