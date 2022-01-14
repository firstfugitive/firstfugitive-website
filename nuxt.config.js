import PathsGenerator from './assets/js/PathsGenerator';
import path from 'path'
import fs from 'fs'

function checkFileExists(file) {
  var file = undefined;
  try {
    file = fs.existsSync(file);
  } catch(e) {
    //file does not exist
  }
  return file !== undefined;
}

var filesFound = checkFileExists(process.env.CERT_PATH+'privkey.pem');

export default {
  env: {
    CTF_PREVIEW: 'true', /* process.env.PREVIEW === 'true' */
  },

  generate: {
    routes: PathsGenerator.generatePaths,
    concurrency: 100,
    crawler: false
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'firstfugitive-website',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components/atom/',
      watch: true
    }, {
      path: '~/components/molecule/',
      watch: true
    }, {
      path: '~/components/organism/',
      watch: true
    }, {
      path: '~/components/pageContent/',
      prefix: 'page',
      watch: true
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: 
  process.env.NODE_ENV !== 'production' 
    && filesFound !== undefined 
    && false ? 
    {
    https: {
      key: fs.readFileSync(path.resolve(process.env.CERT_PATH, 'privkey.pem')),
      cert: fs.readFileSync(path.resolve(process.env.CERT_PATH, 'cert.pem'))
    }
  } : {}
}
