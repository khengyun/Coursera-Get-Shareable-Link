import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
// const isDev = process.env.NODE_ENV == 'development'
const isDev = process.env.NODE_ENV == ''

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo.png',
    32: 'img/logo.png',
    48: 'img/logo.png',
    128: 'img/logo.png',
  },
  host_permissions: ['https://www.coursera.org/*'],

  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['https://www.coursera.org/*'],
      js: ['src/contentScript/index.ts'],
      run_at: 'document_idle',
    },
  ],

  web_accessible_resources: [
    {
      resources: ['img/*.png'],
      matches: [],
    },
  ],
  permissions: ['https://www.coursera.org/*', 'webRequest'],
})
