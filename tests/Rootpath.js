


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


	describe('new Rootpath()', function ()
	{
		it('can constructs with no arguments', function ()
		{
			var rootpath = new Rootpath;
			expect(rootpath.path).toBe('/tmp');
		});
		it('can constructs with single argument', function ()
		{
			{
				var rootpath = new Rootpath('a');
				expect(rootpath.path).toBe('/tmp/a');
			}

			{
				var rootpath = new Rootpath('a/');
				expect(rootpath.path).toBe('/tmp/a');
			}
		});
		it('can constructs with multiple arguments', function ()
		{
			{
				var rootpath = new Rootpath('a', 'b');
				expect(rootpath.path).toBe('/tmp/a/b');
			}
			{
				var rootpath = new Rootpath('a/', 'b/');
				expect(rootpath.path).toBe('/tmp/a/b');
			}
		})
	});

	describe('Rootpath#resolve', function ()
	{
		it('can resolve with no arguments', function ()
		{
			var rootpath = new Rootpath;
			expect(rootpath.resolve()).toBe('/tmp');
		});
		it('can resolve with no single argument', function ()
		{
			var rootpath = new Rootpath;
			expect(rootpath.resolve('abc')).toBe('/tmp/abc');
			expect(rootpath.resolve('abc/')).toBe('/tmp/abc');
		});
		it('can resolve with no multiple arguments', function ()
		{
			var rootpath = new Rootpath;
			expect(rootpath.resolve('abc', 'def')).toBe('/tmp/abc/def');
			expect(rootpath.resolve('abc/', 'def/')).toBe('/tmp/abc/def');
		});
	});
});
