/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"]
};