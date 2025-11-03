import globals from "globals";

export default [
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.node
			}
		},
		rules: {
			"curly": ["error", "all"],
			"eqeqeq": ["error", "always"],
			"no-trailing-spaces": "error",
			"no-undef": "error",
			"no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
			"no-var": "error",
			"prefer-const": "error"
		}
	}
];