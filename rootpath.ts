/// <reference path='node_modules/def-prop/def.d.ts' />
/// <reference path='other.d.ts' />

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
	var base = determine(args)

	var rootpath = function rootpath (...args: Rootpath$Path[])
	{
		return resolve(base, args)
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


import find_root from 'find-root'

function determine (args: Rootpath$Path[])
{
	if (args.length)
	{
		return resolve(args)
	}
	else try
	{
		return find_root(process.cwd())
	}
	catch (e)
	{
		return resolve()
	}
}


import flatten from 'lodash.flattendeep'
import globjoin from 'globjoin'

function resolve (...args: Rootpath$Path[]): string
{
	args = (flatten(args) as Rootpath$Path[])

	var resolved = ''

	while (args.length && ! is_absolute(resolved))
	{
		var arg = String(args.pop())
		resolved = globjoin(arg, resolved)
	}

	if (! is_absolute(resolved))
	{
		resolved = globjoin(process.cwd(), resolved)
	}

	if (resolved !== '/' && resolved.slice(-1) === '/')
	{
		resolved = resolved.slice(0, -1)
	}

	return resolved
}

function is_absolute (arg: string): boolean
{
	if (arg[0] === '!')
	{
		arg = arg.slice(1)
	}

	return path.isAbsolute(arg)
}
