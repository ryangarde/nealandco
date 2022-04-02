export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - cms_front2',
    title: 'Neal & Co. Realty',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'Neal & Co. Realty' },
      { name: 'copyright', content: 'Neal & Co. Realty' },
      { name: 'og:title', content: 'Neal & Co. Realty' },
      { name: 'og:type', content: 'Real Estate' },
      { name: 'og:url', content: 'https://nealandcorealty.com' },
      { name: 'og:site_name', content: 'Neal & Co. Realty' },
      { name: 'twitter:title', content: 'Neal & Co. Realty' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.quilljs.com/1.2.6/quill.snow.css',
      },
    ],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: 'plugins/axios', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['cookie-universal-nuxt'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3,
  //       },
  //     },
  //   },
  // },

  publicRuntimeConfig: {
    imageUrl: process.env.IMAGE_URL,
    baseUrl: process.env.BASE_URL,
    adminUrl: process.env.ADMIN_URL,
  },

  server: {
    port: process.env.PORT,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
