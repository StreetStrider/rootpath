
; export type T_Rootpath_Path = string
// ; export type T_Rootpath_Path = string | T_Rootpath

; export type T_Rootpath_PathSeq = T_Rootpath_Path | T_Rootpath_Path[]

; export interface F_Resolve  { (...args: T_Rootpath_PathSeq[]): string }
; export interface F_Rootpath { (...args: T_Rootpath_PathSeq[]): T_Rootpath }

; export interface T_Rootpath extends F_Resolve
{
	path: string,
	resolve: F_Resolve,
	relative(to: T_Rootpath_Path): string,
	partial: F_Rootpath,
	contains(path: T_Rootpath_Path): boolean,
	toString: () => string,
}

var Rootpath: F_Rootpath = function Rootpath (...args: T_Rootpath_Path[])
:T_Rootpath
{
	var root = flat(args)

	var rootpath = function rootpath (...args: T_Rootpath_Path[])
	{
		return flat(root, args)
	}

	enumvalue(rootpath, 'path', root)

	value(rootpath, 'resolve', function resolve (...args: T_Rootpath_Path[])
	{
		return rootpath(args)
	})

	value(rootpath, 'relative', function relative (to: T_Rootpath_Path)
	{
		return path__relative(root, String(to))
	})

	value(rootpath, 'partial', function partial (...args: T_Rootpath_Path[])
	{
		return Rootpath(rootpath(args))
	})

	value(rootpath, 'contains', function contains (path: T_Rootpath_Path)
	{
		return path__contains(rootpath(), String(path))
	})

	value(rootpath, 'toString', function toString ()
	{
		return rootpath()
	})

	return rootpath as T_Rootpath
}

export default Rootpath


import { resolve as path__resolve } from 'path'
import flatten from 'lodash.flattendeep'

function flat (...args: T_Rootpath_PathSeq[]): string
{
	args = flatten(args)
	args = args.map(String)

	return path__resolve.apply(null, args)
}


import { relative as path__relative } from 'path'
import { contains as path__contains } from 'node-path-extras'

function value (object, key, value)
{
	Object.defineProperty(object, key, { value: value })
}

function enumvalue (object, key, value)
{
	Object.defineProperty(object, key, { value: value, enumerable: true })
}
