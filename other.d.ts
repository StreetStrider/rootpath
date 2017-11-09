
declare module 'path'
{
	import * as node__path from 'path'
	export default node__path
}

declare module 'find-root'
{
	export default (string: string) => string;
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

	var extras: Extras

	export default extras
}
