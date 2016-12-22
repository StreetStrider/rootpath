/* @flow */
/* ::
export type T_Rootpath_Path = string | T_Rootpath;

export type T_Rootpath_PathSeq
= T_Rootpath_Path
| Array<T_Rootpath_Path | T_Rootpath_PathSeq>;

export type F_Resolve  = (...args: Array<T_Rootpath_PathSeq>) => string;
export type F_Rootpath = (...args: Array<T_Rootpath_PathSeq>) => T_Rootpath;

export type T_Rootpath = F_Resolve
&
{
	(...args: Array<T_Rootpath_PathSeq>): string,
	path: string,
	resolve: F_Resolve,
	relative: (to: string) => string,
	partial: F_Rootpath,
	+toString: () => string
};
*/

var Rootpath /* :F_Rootpath */
= function Rootpath (/* [path, or path[], ...] */)
	/* :T_Rootpath */
{
	var root = flatres(arguments)

	var rootpath = function rootpath (/* [path, or path[], ...] */)
	{
		return flatres(root, arguments)
	}

	{
		/* hacks for flow: */
		/* eslint-disable max-statements-per-line */
		rootpath.path = ''
		delete rootpath.path

		/* istanbul ignore next */
		rootpath.resolve = function () { return '' }
		delete rootpath.resolve

		/* istanbul ignore next */
		rootpath.relative = function () { return '' }
		delete rootpath.relative

		/* istanbul ignore next */
		/* @flow-off */
		rootpath.partial = function () { return {} }
		delete rootpath.partial
		/* eslint-enable max-statements-per-line */
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

module.exports = Rootpath

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
