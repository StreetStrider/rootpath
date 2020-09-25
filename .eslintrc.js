
module.exports =
{
	extends: require.resolve('js-outlander'),

	parser: '@typescript-eslint/parser',
	parserOptions:
	{
		sourceType: 'module',
	},

	plugins:
	[
		'@typescript-eslint',
	],

	rules:
	{
		'@typescript-eslint/no-unused-vars': 2,
		// '@typescript-eslint/no-unused-expressions': [ 2, { allowShortCircuit: true } ],
	},
}
