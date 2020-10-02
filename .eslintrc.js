
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
		'no-unused-vars': 0,
		'@typescript-eslint/no-unused-vars': 2,

		'no-unused-expressions': 0,
		'@typescript-eslint/no-unused-expressions': 2,
	},
}
