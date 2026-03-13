/** @type {import('jest').Config} */
module.exports = {
	verbose: true,
	testEnvironment: "node",
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: "tsconfig.json",
				useESM: true,
			},
		],
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
	testMatch: ["**/*.test.ts"],
	extensionsToTreatAsEsm: [".ts"],
};

