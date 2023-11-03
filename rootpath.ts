/* eslint complexity: [ 2, 6 ] */
// TODO: type naming overhaul
// TODO: consider fixing glob double negation on rootpath's side

export type Rootpath$Segment = (string | $Rootpath)

export type Rootpath$Path = (Rootpath$Segment | Rootpath$Path[])

export interface Rootpath$Resolver
{
	(...args: Rootpath$Path[]): string,
}

export interface Rootpath$Constructor
{
	new (...args: Rootpath$Path[]): $Rootpath,
	(...args: Rootpath$Path[]): $Rootpath,
}

export interface $Rootpath extends Rootpath$Resolver
{
	path: string,
	resolve: Rootpath$Resolver,
	relative (to: Rootpath$Segment): string,
	partial: Rootpath$Constructor,
	contains (it: Rootpath$Segment): boolean,
	guard (inside: Rootpath$Segment): void,
	over (each: Rootpath$Path[]): string[],
	toString (): string,
}


import def from 'def-prop'
import val from 'def-prop/val'

import path from 'path'


function Rootpath (...args: Rootpath$Path[]): $Rootpath
{
	const base = determine(args)

	const rootpath = function rootpath (...args: Rootpath$Path[])
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

	function contains (it: Rootpath$Segment)
	{
		it = resolve(it)
		return (it.indexOf(base) === 0) && (it.slice(base.length)[0] === path.sep)
	}

	def(rootpath, 'contains', val(contains))

	def(rootpath, 'guard', val(function guard (inside: Rootpath$Segment)
	{
		if (! contains(inside))
		{
			throw new TypeError(`rootpath/must_be_contained`)
		}
	}))

	def(rootpath, 'over', val(function over (each: Rootpath$Path[])
	{
		return each.map(path => resolve(path))
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
	if (! args.length)
	{
		try
		{
			return find_root(process.cwd())
		}
		catch (e)
		{
			return resolve()
		}
	}

	if (args.length === 1)
	{
		const arg = String(args[0])
		if (arg.startsWith('file://'))
		{
			return path.dirname(arg.slice(7))
		}
	}

	return resolve(args)
}


import flatten  from 'lodash.flattendeep'
import globjoin from 'globjoin'

function resolve (...args: Rootpath$Path[]): string
{
	args = (flatten(args) as Rootpath$Path[])

	let resolved = ''

	while (args.length && ! is_absolute(resolved))
	{
		const arg = String(args.pop())
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
