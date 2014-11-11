


module.exports = Rootpath;

var
	path = require('path');

function Rootpath (/* [path, ...] */)
{
	var
		_path    = path.resolve.apply(null, arguments),
		_resolve = path.resolve.bind(null, _path);

	var rootpath = function rootpath (/* [path, ...] */)
	{
		return _resolve.apply(null, arguments);
	};

	Object.defineProperty(rootpath, 'path', { value: _path });

	rootpath.resolve = _resolve;
	rootpath.partial = function partial ()
	{
		return Rootpath(rootpath.apply(null, arguments));
	};

	return rootpath;
}
