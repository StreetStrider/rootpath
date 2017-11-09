
declare module 'path'
{
	import * as node__path from 'path'
	export default node__path
}

declare module 'find-root'
{
	type FindRoot = (string: string) => string;

	const findRoot: FindRoot;

	export default findRoot;
}

declare module 'lodash.flattendeep'
{
	import { flattenDeep } from 'lodash'

	export default flattenDeep
}

declare module 'node-path-extras'
{
	interface Extras
	{
		contains (path: string, subPath: string): boolean,
	}

	const extras: Extras

	export default extras
}
