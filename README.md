# rootpath
Address Node.js project's files relatively to project's root.

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
  this.rootpath = new Rootpath(__dirname, '..');
  this.config   = require(this.roopath.resolve('cfg', 'config.json');

  /* or
  this.config   = require(this.roopath.resolve('cfg/config.json');
  */
}
```
