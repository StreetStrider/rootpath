


module.exports = Rootpath;

var
	path = require('path');

function Rootpath (pathElement /* , ... */)
{
	var paths, _path;

	paths = toArray(arguments);

	if (! paths.length)
	{
		paths = [ process.cwd() ];
	}

	_path = join(paths);
	_path = path.resolve(_path);

	this.path = _path;
}

Rootpath.prototype.resolve = function rootpath__resolve (pathElement /* ... */)
{
	return path.resolve(this.path, join(toArray(arguments)));
};


/* join many */
function join (pathElements)
{
	return path.join.apply(path, pathElements);
}

/* arguments -> array */
{
	function toArray (seq)
	{
		return _slice.call(seq, 0);
	}
	var _slice = Array.prototype.slice;
}
