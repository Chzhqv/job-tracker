// Load our test-only environment variables (env.jest) before any test file runs.
// This has to happen here, in the Jest config, rather than in a test file, because
// Jest loads this config before it even requires your test files — and your app
// (via src/logger.js) reads process.env.LOG_LEVEL as soon as it's required.
const path = require('path');
const envFile = path.join(__dirname, 'env.jest');
require('dotenv').config({ path: envFile });

module.exports = {
  verbose: true,
  testTimeout: 5000,
};
