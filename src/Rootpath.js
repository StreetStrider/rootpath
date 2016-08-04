
module.exports = function Rootpath (/* [path, or path[], ...] */)
{
	var root = flatres(arguments)

	var rootpath = function rootpath (/* [path, or path[], ...] */)
	{
		return flatres(root, arguments)
	}

	enumvalue(rootpath, 'path', root)

	var resolve = function resolve (/* [path, or path[], ...] */)
	{
		return rootpath(arguments)
	}
	value(rootpath, 'resolve', resolve)

	var relative = function relative (to)
	{
		return path__relative(root, to)
	}
	value(rootpath, 'relative', relative)

	var partial = function partial (/* [path, or path[], ...] */)
	{
		return Rootpath(rootpath(arguments))
	}
	value(rootpath, 'partial', partial)

	return rootpath
}


var path__resolve = require('path').resolve
var flat = require('lodash.flattendeep')

function flatres ()
{
	return path__resolve.apply(null, flat(arguments))
}


var path__relative = require('path').relative


function value (object, key, value)
{
	Object.defineProperty(object, key, { value: value })
}

function enumvalue (object, key, value)
{
	Object.defineProperty(object, key, { value: value, enumerable: true })
}
