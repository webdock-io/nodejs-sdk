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
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
	testMatch: ["**/*.jest.test.ts"],
};

