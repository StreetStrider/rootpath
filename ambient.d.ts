
declare module 'node-path-extras'
{
	interface Extras
	{
		contains (path: string, subPath: string): boolean,
	}

	const extras: Extras

	export default extras
}
