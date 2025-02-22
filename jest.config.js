const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom", // Ensure this is set correctly

  // // Fix module resolution for msw/node
  // moduleNameMapper: {
  //   "^msw/node$": "msw/lib/node/index.js",
  // },
  
};

module.exports = createJestConfig(customJestConfig);
