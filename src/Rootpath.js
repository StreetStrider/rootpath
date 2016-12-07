
module.exports = function Rootpath (/* [path, or path[], ...] */)
{
	var root = flatres(arguments)

	var rootpath = function rootpath (/* [path, or path[], ...] */)
	{
		return flatres(root, arguments)
	}

	enumvalue(rootpath, 'path', root)

	value(rootpath, 'resolve', function resolve (/* [path, or path[], ...] */)
	{
		return rootpath(arguments)
	})

	value(rootpath, 'relative', function relative (to)
	{
		return path__relative(root, to)
	})

	value(rootpath, 'partial', function partial (/* [path, or path[], ...] */)
	{
		return Rootpath(rootpath(arguments))
	})

	value(rootpath, 'toString', function toString ()
	{
		return rootpath()
	})

	return rootpath
}


var path__resolve = require('path').resolve
var flat = require('lodash.flattendeep')

function flatres ()
{
	var args = arguments
	args = flat(args)
	args = args.map(String)

	return path__resolve.apply(null, args)
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
