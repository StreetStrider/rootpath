


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
		it('can resolve with no single argument', function ()
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
		it('can resolve with no multiple arguments', function ()
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
});

function $expectRootpathFunction (rootpath)
{
	expect(typeof rootpath).toBe('function');
	expect(rootpath.name).toBe('rootpath');
}
