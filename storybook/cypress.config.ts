import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    PERCY: !!process.env.PERCY_TOKEN,
  },
  e2e: {
    setupNodeEvents(_on, _config) {
      // This method is needed for Cypress /Th
    },
  },
});
