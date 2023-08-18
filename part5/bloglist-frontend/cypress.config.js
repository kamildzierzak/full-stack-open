const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
  },
  env: {
    BACKEND: 'http://localhost:3003/api',
  },
})
