
; export type Rootpath$Segment = string | $Rootpath

; interface Recursive<T> extends Array<T|Recursive<T>> {}

; export type Rootpath$Path = Rootpath$Segment | Recursive<Rootpath$Segment>

; export interface Rootpath$Resolver
{
	(...args: Rootpath$Path[]): string,
}

; export interface Rootpath$Constructor
{
	new (...args: Rootpath$Path[]): $Rootpath,
	(...args: Rootpath$Path[]): $Rootpath
}

; export interface $Rootpath extends Rootpath$Resolver
{
	path: string,
	resolve: Rootpath$Resolver,
	relative(to: Rootpath$Segment): string,
	partial: Rootpath$Constructor,
	contains(path: Rootpath$Segment): boolean,
	toString(): string,
}


import path from 'path'
import pathextra from 'node-path-extras'


var Rootpath: Rootpath$Constructor
 = function Rootpath (...args: Rootpath$Path[]): $Rootpath
{
	var base = flat(args)

	var rootpath = function rootpath (...args: Rootpath$Path[])
	{
		return flat(base, args)
	}

	enumvalue(rootpath, 'path', base)

	value(rootpath, 'resolve', function resolve (...args: Rootpath$Path[])
	{
		return rootpath(args)
	})

	value(rootpath, 'relative', function relative (to: Rootpath$Segment)
	{
		return path.relative(base, String(to))
	})

	value(rootpath, 'partial', function partial (...args: Rootpath$Path[])
	{
		return Rootpath(rootpath(args))
	})

	value(rootpath, 'contains', function contains (path: Rootpath$Segment)
	{
		return pathextra.contains(rootpath(), String(path))
	})

	value(rootpath, 'toString', function toString ()
	{
		return rootpath()
	})

	return rootpath as $Rootpath
}

export default Rootpath


import flatten from 'lodash.flattendeep'

function flat (...args: Rootpath$Path[]): string
{
	args = flatten(args)
	args = args.map(String)

	return path.resolve.apply(null, args)
}


function value (object: Object, key: string, value: any)
{
	Object.defineProperty(object, key, { value: value })
}

function enumvalue (object: Object, key: string, value: any)
{
	Object.defineProperty(object, key, { value: value, enumerable: true })
}
