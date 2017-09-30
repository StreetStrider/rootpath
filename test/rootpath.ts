
import { deepEqual as eq } from 'assert'

import Rootpath from '../'

describe('Rootpath', () =>
{
	var dir: string = ''

	beforeEach(() =>
	{
		dir = process.cwd()
		process.chdir('/tmp')
	})

	afterEach(() =>
	{
		process.chdir(dir)
	})


	describe('new Rootpath(), Rootpath()', () =>
	{
		it('can constructs with no arguments', () =>
		{
			{
				var rootpath = new Rootpath
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath()
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can constructs with single argument', () =>
		{
			{
				var rootpath = new Rootpath('a')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath('a')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}

			{
				var rootpath = new Rootpath('a/')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath('a/')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can constructs upper level', () =>
		{
			{
				var rootpath = new Rootpath('..')
				eq(rootpath.path, '/')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = new Rootpath('../')
				eq(rootpath.path, '/')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can constructs with multiple arguments', () =>
		{
			{
				var rootpath = new Rootpath('a', 'b')
				eq(rootpath.path, '/tmp/a/b')
			}
			{
				var rootpath = Rootpath('a', 'b')
				eq(rootpath.path, '/tmp/a/b')
			}

			{
				var rootpath = new Rootpath('a/', 'b/')
				eq(rootpath.path, '/tmp/a/b')
			}
			{
				var rootpath = Rootpath('a/', 'b/')
				eq(rootpath.path, '/tmp/a/b')
			}
		})
		it('can constructs with non-flat arguments', () =>
		{
			{
				var rootpath = new Rootpath('a', [ 'b', 'c' ], [ 'd' ])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}
			{
				var rootpath = Rootpath('a', [ 'b', 'c' ], [ 'd' ])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}

			{
				var rootpath = new Rootpath('a', [ 'b', [ 'c' ]], [[ 'd' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}
			{
				var rootpath = Rootpath('a', [ 'b', [ 'c' ]], [[ 'd' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}
		})
	})

	describe('Rootpath#path', () =>
	{
		it('non-writeable', () =>
		{
			var rootpath = Rootpath()
			var path = rootpath.path

			$expectRootpathFunction(rootpath)

			try
			{
				rootpath.path = path + 'something'
			}
			catch (e)
			{
			}

			eq(rootpath.path, path)
		})
	})

	describe('Rootpath#resolve(), rootpath()', () =>
	{
		it('can resolve with no arguments', () =>
		{
			var rootpath = Rootpath()

			eq(rootpath.resolve(), '/tmp')
			eq(rootpath(), '/tmp')
		})
		it('can resolve with single argument', () =>
		{
			var rootpath = Rootpath()
			{
				eq(rootpath.resolve('abc'), '/tmp/abc')
				eq(rootpath.resolve('abc/'), '/tmp/abc')
			}
			{
				eq(rootpath('abc'), '/tmp/abc')
				eq(rootpath('abc/'), '/tmp/abc')
			}

		})
		it('can resolve upper level', () =>
		{
			var rootpath = Rootpath()
			{
				eq(rootpath.resolve('..'), '/')
				eq(rootpath.resolve('../'), '/')
			}
			{
				eq(rootpath('..'), '/')
				eq(rootpath('../'), '/')
			}
		})
		it('can resolve with multiple arguments', () =>
		{
			var rootpath = Rootpath()
			{
				eq(rootpath.resolve('abc', 'def'), '/tmp/abc/def')
				eq(rootpath.resolve('abc/', 'def/'), '/tmp/abc/def')
			}
			{
				eq(rootpath('abc', 'def'), '/tmp/abc/def')
				eq(rootpath('abc/', 'def/'), '/tmp/abc/def')
			}
		})
		it('can resolve with non-flat arguments', () =>
		{
			var rootpath = Rootpath()
			{
				eq(rootpath.resolve('a', [ 'b' ], [ 'c', 'd' ]), '/tmp/a/b/c/d')
			}
			{
				eq(rootpath('a', [ 'b' ], [ 'c', 'd' ]), '/tmp/a/b/c/d')
			}
			{
				eq(
					rootpath.resolve('a', [ 'b', [ 'c' ]], [[ 'd' ]]),
					'/tmp/a/b/c/d'
				)
			}
			{
				eq(rootpath('a', [ 'b', [ 'c' ]], [[ 'd' ]]), '/tmp/a/b/c/d')
			}
		})
	})

	describe('Rootpath#relative()', () =>
	{
		it('can pick relatively', () =>
		{
			var rootpath = Rootpath('/tmp/a')

			eq(rootpath.relative('/tmp/a/b/c'), 'b/c')
			eq(rootpath.relative('/tmp/a'), '')
		})

		it('works with Rootpath', () =>
		{
			var X = Rootpath('/tmp/a')
			var Y = Rootpath('/tmp/a/b/c')

			eq(X.relative(Y()), 'b/c')
			eq(X.relative(Y.resolve()), 'b/c')
			eq(X.relative(Y), 'b/c')
		})
	})

	describe('Rootpath#partial()', () =>
	{
		it('can partial with no arguments', () =>
		{
			var rootpath = Rootpath('a').partial()
			eq(rootpath.path, '/tmp/a')
			$expectRootpathFunction(rootpath)
		})
		it('can partial with single argument', () =>
		{
			{
				var rootpath = Rootpath('a').partial('b')
				eq(rootpath.path, '/tmp/a/b')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath('a/').partial('b/')
				eq(rootpath.path, '/tmp/a/b')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can partial upper level', () =>
		{
			{
				var rootpath = Rootpath('a').partial('..')
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath('a/').partial('../')
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can partial with multiple arguments', () =>
		{
			{
				var rootpath = Rootpath('a').partial('b', 'c')
				eq(rootpath.path, '/tmp/a/b/c')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath('a/').partial('b', 'c/')
				eq(rootpath.path, '/tmp/a/b/c')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can partial with non-flat arguments', () =>
		{
			{
				var rootpath = Rootpath().partial('a', [ 'b', 'c' ], 'd')
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath().partial('a', [ 'b', 'c' ], 'd/')
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath().partial('a', [ 'b', [ 'c' ]], [[ 'd' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
			{
				var rootpath = Rootpath().partial('a', [ 'b', [ 'c' ]], [[ 'd/' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
		})
	})

	describe('Rootpath#contains()', () =>
	{
		it('works with path', () =>
		{
			var X = Rootpath('/tmp/a')

			eq(X.contains('/tmp/a/b'), true)
			eq(X.contains('/tmp/c'), false)
		})

		it('works with Rootpath', () =>
		{
			var X = Rootpath('/tmp/a')
			var Y = Rootpath('/tmp')

			eq(X.contains(Y()), false)
			eq(X.contains(Y.resolve()), false)
			eq(X.contains(Y), false)

			eq(X.contains(Y.partial('a/b')()), true)
			eq(X.contains(Y.partial('a/b').resolve()), true)
			eq(X.contains(Y.partial('a/b')), true)
		})
	})

	describe('Rootpath#toString()', () =>
	{
		it('can be converted to string', () =>
		{
			var X = Rootpath('/tmp/a')

			eq(String(X), '/tmp/a')
			eq(X.toString(), '/tmp/a')
		})

		it('Rootpath instance can be used as base for another one', () =>
		{
			var X = Rootpath('/tmp/a')
			var Y = Rootpath(X, 'b')

			eq(Y.path, '/tmp/a/b')
			$expectRootpathFunction(Y)
		})
	})

	describe('Rootpath issues', () =>
	{
		it('does not mess up with multiple instances', () =>
		{
			var X = Rootpath('x')
			var x = X()

			// eslint-disable-next-line no-unused-vars
			var Y = Rootpath('y')

			eq(x, X())
		})
	})
})

function $expectRootpathFunction (rootpath: any)
{
	eq(typeof rootpath, 'function')
	eq(rootpath.name, 'rootpath')

	eq(typeof rootpath.path, 'string')
	eq(rootpath.path, rootpath())

	eq(typeof rootpath.resolve, 'function')
	// eq(rootpath.resolve.name, 'resolve')
	eq(rootpath.path, rootpath.resolve())

	eq(typeof rootpath.relative, 'function')
	// eq(rootpath.relative.name, 'relative')

	eq(typeof rootpath.partial, 'function')
	eq(rootpath.partial.name, 'partial')
}
