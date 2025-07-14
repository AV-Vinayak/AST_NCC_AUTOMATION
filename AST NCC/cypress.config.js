const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl1: "http://18.212.216.28",
    baseUrl2:"http://ec2-18-233-201-52.compute-1.amazonaws.com",
    chromeWebSecurity: false,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 100000,
    responseTimeout: 100000,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
    retries: {
      "runMode": 2,
      "openMode": 0
    },
    testIsolation: false,
    reporterOptions: {
      reportDir: "cypress/reports",
      reportFilename: "[status]_[datetime]-report",
      reportPageTitle: 'Service-Cell-Flow',
      embeddedScreenshots: true,
      inlineAssets: true,
      overwrite: false,
      html: true,
      json: true,
      charts: true
    },
    "video": false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
