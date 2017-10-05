/// <reference path='index.d.ts' />
/// <reference path='node_modules/def-prop/def.d.ts' />

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
import def from 'def-prop'

var val = def.val


function Rootpath (...args: Rootpath$Path[]): $Rootpath
{
	var base = flat(args)

	var rootpath = function rootpath (...args: Rootpath$Path[])
	{
		return flat(base, args)
	}

	def(rootpath, 'path', val(base, ':enum'))

	def(rootpath, 'resolve', val(function resolve (...args: Rootpath$Path[])
	{
		return rootpath(args)
	}))

	def(rootpath, 'relative', val(function relative (to: Rootpath$Segment)
	{
		return path.relative(base, String(to))
	}))

	def(rootpath, 'partial', val(function partial (...args: Rootpath$Path[])
	{
		return Rootpath(rootpath(args))
	}))

	def(rootpath, 'contains', val(function contains (path: Rootpath$Segment)
	{
		return pathextra.contains(rootpath(), String(path))
	}))

	def(rootpath, 'toString', val(function toString ()
	{
		return rootpath()
	}))

	return rootpath as $Rootpath
}

export default Rootpath as Rootpath$Constructor


import flatten from 'lodash.flattendeep'

function flat (...args: Rootpath$Path[]): string
{
	args = flatten(args)
	args = args.map(String)

	return path.resolve.apply(null, args)
}
