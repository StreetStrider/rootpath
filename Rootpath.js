/* @flow */
/* ::

export type T_Rootpath_Path = string | T_Rootpath;

export type T_Rootpath_PathSeq = T_Rootpath_Path | Array<T_Rootpath_PathSeq>;

export type F_Resolve  = (...args: Array<T_Rootpath_PathSeq>) => string;
export type F_Rootpath = (...args: Array<T_Rootpath_PathSeq>) => T_Rootpath;

export type T_Rootpath
= F_Resolve
&
{
	path: string,
	resolve: F_Resolve,
	relative: (to: T_Rootpath_Path) => string,
	partial: F_Rootpath,
	contains: (path: T_Rootpath_Path) => boolean,
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
		rootpath.relative = function (to /* :T_Rootpath_Path */)
		{
			return '' && to
		}
		delete rootpath.relative

		/* istanbul ignore next */
		/* @flow-off */
		rootpath.partial = function () { return {} }
		delete rootpath.partial

		/* istanbul ignore next */
		rootpath.contains = function (path /* :T_Rootpath_Path */)
		{
			return true || path
		}
		delete rootpath.contains
		/* eslint-enable max-statements-per-line */
	}

	enumvalue(rootpath, 'path', root)

	value(rootpath, 'resolve', function resolve (/* [path, or path[], ...] */)
	{
		return rootpath(arguments)
	})

	value(rootpath, 'relative', function relative (to)
	{
		return path__relative(root, String(to))
	})

	value(rootpath, 'partial', function partial (/* [path, or path[], ...] */)
	{
		return Rootpath(rootpath(arguments))
	})

	value(rootpath, 'contains', function contains (path)
	{
		return path__contains(rootpath(), String(path))
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

function flatres (/* :: ...args: Array<T_Rootpath_PathSeq> */) /* :string */
{
	var args = arguments
	args = flat(args)
	args = args.map(String)

	return path__resolve.apply(null, args)
}


var path__relative = require('path').relative
var path__contains = require('node-path-extras').contains


function value (object, key, value)
{
	Object.defineProperty(object, key, { value: value })
}

function enumvalue (object, key, value)
{
	Object.defineProperty(object, key, { value: value, enumerable: true })
}
