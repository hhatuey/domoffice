import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run core-react:serve',
        production: 'nx run core-react:preview',
      },
      ciWebServerCommand: 'nx run core-react:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
