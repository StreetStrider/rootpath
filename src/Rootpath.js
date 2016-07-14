


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

	var partial = function partial (/* [path, or path[], ...] */)
	{
		return Rootpath(rootpath(arguments))
	}
	value(rootpath, 'partial', partial)

	return rootpath
}


var path = require('path')
var flat = require('lodash.flattendeep')

function flatres ()
{
	return path.resolve.apply(null, flat(arguments))
}


function value (object, key, value)
{
	Object.defineProperty(object, key, { value: value })
}

function enumvalue (object, key, value)
{
	Object.defineProperty(object, key, { value: value, enumerable: true })
}
