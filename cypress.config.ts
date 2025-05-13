// import { defineConfig } from 'cypress'
//
// export default defineConfig({
//   component: {
//     devServer: {
//       framework: 'angular',
//       bundler: 'webpack',
//     },
//     specPattern: '**/*.cy.ts',
//   },
// })

import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      webpackConfig: { stats: "errors-only" }, // see issue https://github.com/cypress-io/cypress/issues/26456
    },
    specPattern: "**/*.cy.ts",
  },
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
