
declare module 'find-root'
{
	type FindRootCheckFn = (dir: string) => boolean

	export default function findRoot(startingPath: string, check?: FindRootCheckFn): string
}

declare module 'globjoin'
{
	export default function globjoin(...globs: string[]): string
	;
	export default function globjoin(...globs: Array<string | string[]>): string[]
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
