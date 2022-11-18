export default {
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts"],
	transform: {
		"^.+\\.(t|j)s?$": ["@swc/jest"],
	},
};
