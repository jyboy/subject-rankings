const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: "741ucu",
  e2e: {
    baseUrl: 'http://127.0.0.1:10010',
    supportFile: false
  },
  viewportWidth: 375,
  viewportHeight: 667
});
