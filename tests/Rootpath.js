


var Rootpath = require('../');

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
				expect(rootpath.path).toBe('/tmp');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath();
				expect(rootpath.path).toBe('/tmp');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can constructs with single argument', function ()
		{
			{
				var rootpath = new Rootpath('a');
				expect(rootpath.path).toBe('/tmp/a');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a');
				expect(rootpath.path).toBe('/tmp/a');
				$expectRootpathFunction(rootpath);
			}

			{
				var rootpath = new Rootpath('a/');
				expect(rootpath.path).toBe('/tmp/a');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/');
				expect(rootpath.path).toBe('/tmp/a');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can constructs upper level', function ()
		{
			{
				var rootpath = new Rootpath('..');
				expect(rootpath.path).toBe('/');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = new Rootpath('../');
				expect(rootpath.path).toBe('/');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can constructs with multiple arguments', function ()
		{
			{
				var rootpath = new Rootpath('a', 'b');
				expect(rootpath.path).toBe('/tmp/a/b');
			}
			{
				var rootpath = Rootpath('a', 'b');
				expect(rootpath.path).toBe('/tmp/a/b');
			}

			{
				var rootpath = new Rootpath('a/', 'b/');
				expect(rootpath.path).toBe('/tmp/a/b');
			}
			{
				var rootpath = Rootpath('a/', 'b/');
				expect(rootpath.path).toBe('/tmp/a/b');
			}
		})
	});

	describe('Rootpath#resolve(), rootpath()', function ()
	{
		it('can resolve with no arguments', function ()
		{
			var rootpath = new Rootpath;

			expect(rootpath.resolve()).toBe('/tmp');
			expect(rootpath()).toBe('/tmp');
		});
		it('can resolve with single argument', function ()
		{
			var rootpath = new Rootpath;
			{
				expect(rootpath.resolve('abc')).toBe('/tmp/abc');
				expect(rootpath.resolve('abc/')).toBe('/tmp/abc');
			}
			{
				expect(rootpath('abc')).toBe('/tmp/abc');
				expect(rootpath('abc/')).toBe('/tmp/abc');
			}

		});
		it('can resolve upper level', function ()
		{
			var rootpath = new Rootpath;
			{
				expect(rootpath.resolve('..')).toBe('/');
				expect(rootpath.resolve('../')).toBe('/');
			}
			{
				expect(rootpath('..')).toBe('/');
				expect(rootpath('../')).toBe('/');
			}
		});
		it('can resolve with multiple arguments', function ()
		{
			var rootpath = new Rootpath;
			{
				expect(rootpath.resolve('abc', 'def')).toBe('/tmp/abc/def');
				expect(rootpath.resolve('abc/', 'def/')).toBe('/tmp/abc/def');
			}
			{
				expect(rootpath('abc', 'def')).toBe('/tmp/abc/def');
				expect(rootpath('abc/', 'def/')).toBe('/tmp/abc/def');
			}
		});
	});

	describe('Rootpath#partial()', function ()
	{
		it('can partial with no arguments', function ()
		{
			var rootpath = Rootpath('a').partial();
			expect(rootpath.path).toBe('/tmp/a');
			$expectRootpathFunction(rootpath);
		});
		it('can partial with single argument', function ()
		{
			{
				var rootpath = Rootpath('a').partial('b');
				expect(rootpath.path).toBe('/tmp/a/b');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/').partial('b/');
				expect(rootpath.path).toBe('/tmp/a/b');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can partial upper level', function ()
		{
			{
				var rootpath = Rootpath('a').partial('..');
				expect(rootpath.path).toBe('/tmp');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/').partial('../');
				expect(rootpath.path).toBe('/tmp');
				$expectRootpathFunction(rootpath);
			}
		});
		it('can partial with multiple arguments', function ()
		{
			{
				var rootpath = Rootpath('a').partial('b', 'c');
				expect(rootpath.path).toBe('/tmp/a/b/c');
				$expectRootpathFunction(rootpath);
			}
			{
				var rootpath = Rootpath('a/').partial('b', 'c/');
				expect(rootpath.path).toBe('/tmp/a/b/c');
				$expectRootpathFunction(rootpath);
			}
		});
	});
});

function $expectRootpathFunction (rootpath)
{
	expect(typeof rootpath).toBe('function');
	expect(rootpath.name).toBe('rootpath');
}
