


module.exports = function Rootpath (/* [path, or path[], ...] */)
{
	var root = flatres(arguments);

	var rootpath = function rootpath (/* [path, or path[], ...] */)
	{
		return flatres(root, arguments);
	}

	Object.defineProperty(rootpath, 'path', { value: root });

	rootpath.resolve = function resolve (/* [path, or path[], ...] */)
	{
		return rootpath(arguments);
	}
	rootpath.partial = function partial (/* [path, or path[], ...] */)
	{
		return Rootpath(rootpath(arguments));
	}

	return rootpath;
}


var
	path = require('path'),
	flat = require('lodash.flattendeep');

function flatres ()
{
	return path.resolve.apply(null, flat(arguments));
}
