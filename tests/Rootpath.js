


var Rootpath = require('../');

var eq = require('assert').deepEqual;

describe('Rootpath', function ()
{
	var dir;
	beforeEach(function ()
	{
		dir = process.cwd();
		process.chdir('/tmp');
	});

	afterEach(function ()
	{
		process.chdir(dir);
	});


	describe('new Rootpath(), Rootpath()', function ()
	{
		it('can constructs with no arguments', function ()
		{
			{
				var rootpath = new Rootpath;
				eq(rootpath.path, '/tmp');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath();
				eq(rootpath.path, '/tmp');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can constructs with single argument', function ()
		{
			{
				var rootpath = new Rootpath('a');
				eq(rootpath.path, '/tmp/a');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a');
				eq(rootpath.path, '/tmp/a');
				$expectRootpathFunction(rootpath);
			}

			{
				var rootpath = new Rootpath('a/');
				eq(rootpath.path, '/tmp/a');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/');
				eq(rootpath.path, '/tmp/a');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can constructs upper level', function ()
		{
			{
				var rootpath = new Rootpath('..');
				eq(rootpath.path, '/');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = new Rootpath('../');
				eq(rootpath.path, '/');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can constructs with multiple arguments', function ()
		{
			{
				var rootpath = new Rootpath('a', 'b');
				eq(rootpath.path, '/tmp/a/b');
			}
			{
				var rootpath = Rootpath('a', 'b');
				eq(rootpath.path, '/tmp/a/b');
			}

			{
				var rootpath = new Rootpath('a/', 'b/');
				eq(rootpath.path, '/tmp/a/b');
			}
			{
				var rootpath = Rootpath('a/', 'b/');
				eq(rootpath.path, '/tmp/a/b');
			}
		})
	});

	describe('Rootpath#resolve(), rootpath()', function ()
	{
		it('can resolve with no arguments', function ()
		{
			var rootpath = new Rootpath;

			eq(rootpath.resolve(), '/tmp');
			eq(rootpath(), '/tmp');
		});
		it('can resolve with single argument', function ()
		{
			var rootpath = new Rootpath;
			{
				eq(rootpath.resolve('abc'), '/tmp/abc');
				eq(rootpath.resolve('abc/'), '/tmp/abc');
			}
			{
				eq(rootpath('abc'), '/tmp/abc');
				eq(rootpath('abc/'), '/tmp/abc');
			}

		});
		it('can resolve upper level', function ()
		{
			var rootpath = new Rootpath;
			{
				eq(rootpath.resolve('..'), '/');
				eq(rootpath.resolve('../'), '/');
			}
			{
				eq(rootpath('..'), '/');
				eq(rootpath('../'), '/');
			}
		});
		it('can resolve with multiple arguments', function ()
		{
			var rootpath = new Rootpath;
			{
				eq(rootpath.resolve('abc', 'def'), '/tmp/abc/def');
				eq(rootpath.resolve('abc/', 'def/'), '/tmp/abc/def');
			}
			{
				eq(rootpath('abc', 'def'), '/tmp/abc/def');
				eq(rootpath('abc/', 'def/'), '/tmp/abc/def');
			}
		});
	});

	describe('Rootpath#partial()', function ()
	{
		it('can partial with no arguments', function ()
		{
			var rootpath = Rootpath('a').partial();
			eq(rootpath.path, '/tmp/a');
			$expectRootpathFunction(rootpath);
		});
		it('can partial with single argument', function ()
		{
			{
				var rootpath = Rootpath('a').partial('b');
				eq(rootpath.path, '/tmp/a/b');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/').partial('b/');
				eq(rootpath.path, '/tmp/a/b');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can partial upper level', function ()
		{
			{
				var rootpath = Rootpath('a').partial('..');
				eq(rootpath.path, '/tmp');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/').partial('../');
				eq(rootpath.path, '/tmp');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can partial with multiple arguments', function ()
		{
			{
				var rootpath = Rootpath('a').partial('b', 'c');
				eq(rootpath.path, '/tmp/a/b/c');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/').partial('b', 'c/');
				eq(rootpath.path, '/tmp/a/b/c');
				$expectRootpathFunction(rootpath);
			}
		});
	});

	describe('Rootpath issues', function ()
	{
		it('does not mess up with multiple instances', function ()
		{
			var
				X = Rootpath('x'),
				x = X();

			var Y = Rootpath('y');

			eq(x, X());
		});
	});
});

function $expectRootpathFunction (rootpath)
{
	eq(typeof rootpath, 'function');
	eq(rootpath.name, 'rootpath');
}
