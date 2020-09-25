
import { join } from 'path'

import { deepEqual as eq } from 'assert'

import Rootpath from '../rootpath'

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
		var frompackage = join(__dirname, '/..')

		it('can construct with no arguments inside package', () =>
		{
			process.chdir(frompackage)

			{
				let rootpath = new Rootpath
				eq(rootpath.path, frompackage)
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath()
				eq(rootpath.path, frompackage)
				$expectRootpathFunction(rootpath)
			}
		})
		it('can construct with no arguments deep inside package', () =>
		{
			process.chdir(join(frompackage, 'test'))

			{
				let rootpath = new Rootpath
				eq(rootpath.path, frompackage)
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath()
				eq(rootpath.path, frompackage)
				$expectRootpathFunction(rootpath)
			}
		})
		it('can construct with no arguments', () =>
		{
			{
				let rootpath = new Rootpath
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath()
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can construct with single argument', () =>
		{
			{
				let rootpath = new Rootpath('a')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath('a')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}

			{
				let rootpath = new Rootpath('a/')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath('a/')
				eq(rootpath.path, '/tmp/a')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can construct upper level', () =>
		{
			{
				let rootpath = new Rootpath('..')
				eq(rootpath.path, '/')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = new Rootpath('../')
				eq(rootpath.path, '/')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can construct with multiple arguments', () =>
		{
			{
				let rootpath = new Rootpath('a', 'b')
				eq(rootpath.path, '/tmp/a/b')
			}
			{
				let rootpath = Rootpath('a', 'b')
				eq(rootpath.path, '/tmp/a/b')
			}

			{
				let rootpath = new Rootpath('a/', 'b/')
				eq(rootpath.path, '/tmp/a/b')
			}
			{
				let rootpath = Rootpath('a/', 'b/')
				eq(rootpath.path, '/tmp/a/b')
			}
		})
		it('can construct with non-flat arguments', () =>
		{
			{
				let rootpath = new Rootpath('a', [ 'b', 'c' ], [ 'd' ])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}
			{
				let rootpath = Rootpath('a', [ 'b', 'c' ], [ 'd' ])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}

			{
				let rootpath = new Rootpath('a', [ 'b', [ 'c' ]], [[ 'd' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}
			{
				let rootpath = Rootpath('a', [ 'b', [ 'c' ]], [[ 'd' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
			}
		})
		it('can construct with absolute paths', () =>
		{
			{
				let rootpath = new Rootpath('abc', '/def')
				eq(rootpath.path, '/def')
			}
			{
				let rootpath = new Rootpath('abc', '/def/')
				eq(rootpath.path, '/def')
			}
			{
				let rootpath = Rootpath('abc', '/def')
				eq(rootpath.path, '/def')
			}
			{
				let rootpath = Rootpath('abc', '/def/')
				eq(rootpath.path, '/def')
			}
		})
		it('can construct with glob', () =>
		{
			{
				let rootpath = new Rootpath('**', 'b/', '*/', 'c')
				eq(rootpath.path, '/tmp/**/b/*/c')
			}
			{
				let rootpath = new Rootpath('**', 'b/', '*/', 'c/')
				eq(rootpath.path, '/tmp/**/b/*/c')
			}
			{
				let rootpath = Rootpath('**', 'b/', '*/', 'c')
				eq(rootpath.path, '/tmp/**/b/*/c')
			}
			{
				let rootpath = Rootpath('**', 'b/', '*/', 'c/')
				eq(rootpath.path, '/tmp/**/b/*/c')
			}
		})
		it('can construct with negative glob', () =>
		{
			{
				let rootpath = new Rootpath('**', '!b/', '*/', 'c')
				eq(rootpath.path, '!/tmp/**/b/*/c')
			}
			{
				let rootpath = new Rootpath('**', '!b/', '*/', 'c/')
				eq(rootpath.path, '!/tmp/**/b/*/c')
			}
			{
				let rootpath = Rootpath('**', '!b/', '*/', 'c')
				eq(rootpath.path, '!/tmp/**/b/*/c')
			}
			{
				let rootpath = Rootpath('**', '!b/', '*/', 'c/')
				eq(rootpath.path, '!/tmp/**/b/*/c')
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
		it('can resolve this level (.)', () =>
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
		it('can resolve upper level (..)', () =>
		{
			var rootpath = Rootpath()
			{
				eq(rootpath.resolve('.'), '/tmp')
				eq(rootpath.resolve('./'), '/tmp')
			}
			{
				eq(rootpath('.'), '/tmp')
				eq(rootpath('./'), '/tmp')
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
		it('can resolve with absolute paths', () =>
		{
			var rootpath = Rootpath()
			{
				eq(rootpath.resolve('abc', '/def'), '/def')
				eq(rootpath.resolve('abc/', '/def/'), '/def')
			}
			{
				eq(rootpath('abc', '/def'), '/def')
				eq(rootpath('abc/', '/def/'), '/def')
			}
		})
		it('can resolve with glob', () =>
		{
			var rootpath = new Rootpath()
			{
				eq(rootpath.resolve('**', 'b/', '*', 'c'), '/tmp/**/b/*/c')
			}
			{
				eq(rootpath('**', 'b/', '*', 'c'), '/tmp/**/b/*/c')
			}
			{
				eq(rootpath.resolve('**', 'b/', '*', 'c/'), '/tmp/**/b/*/c')
			}
			{
				eq(rootpath('**', 'b/', '*', 'c/'), '/tmp/**/b/*/c')
			}
		})
		it('can resolve with negative glob', () =>
		{
			var rootpath = new Rootpath()
			{
				eq(rootpath.resolve('**', '!b/', '*', 'c'), '!/tmp/**/b/*/c')
			}
			{
				eq(rootpath('**', '!b/', '*', 'c'), '!/tmp/**/b/*/c')
			}
			{
				eq(rootpath.resolve('**', '!b/', '*', 'c/'), '!/tmp/**/b/*/c')
			}
			{
				eq(rootpath('**', '!b/', '*', 'c/'), '!/tmp/**/b/*/c')
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
				let rootpath = Rootpath('a').partial('b')
				eq(rootpath.path, '/tmp/a/b')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath('a/').partial('b/')
				eq(rootpath.path, '/tmp/a/b')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can partial upper level', () =>
		{
			{
				let rootpath = Rootpath('a').partial('..')
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath('a/').partial('../')
				eq(rootpath.path, '/tmp')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can partial with multiple arguments', () =>
		{
			{
				let rootpath = Rootpath('a').partial('b', 'c')
				eq(rootpath.path, '/tmp/a/b/c')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath('a/').partial('b', 'c/')
				eq(rootpath.path, '/tmp/a/b/c')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can partial with non-flat arguments', () =>
		{
			{
				let rootpath = Rootpath().partial('a', [ 'b', 'c' ], 'd')
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath().partial('a', [ 'b', 'c' ], 'd/')
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath().partial('a', [ 'b', [ 'c' ]], [[ 'd' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
			{
				let rootpath = Rootpath().partial('a', [ 'b', [ 'c' ]], [[ 'd/' ]])
				eq(rootpath.path, '/tmp/a/b/c/d')
				$expectRootpathFunction(rootpath)
			}
		})
		it('can partial with glob', () =>
		{
			{
				let rootpath = Rootpath('a').partial('**', 'b/')
				eq(rootpath.path, '/tmp/a/**/b')
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

			// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
	eq(rootpath.resolve.name, 'resolve')
	eq(rootpath.path, rootpath.resolve())

	eq(typeof rootpath.relative, 'function')
	eq(rootpath.relative.name, 'relative')

	eq(typeof rootpath.partial, 'function')
	eq(rootpath.partial.name, 'partial')
}
