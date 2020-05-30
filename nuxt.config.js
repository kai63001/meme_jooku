const webpack = require('webpack')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow, all,max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'theme-color', content: '#ef476f' },
      { 'http-equiv': 'content-type', content: 'text/html; charset=UTF-8' },
      { 'http-equiv': 'content-language', content: 'en' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Mitr:wght@400;600&display=swap'
      }
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js',
        type: 'text/javascript'
      }
    ]
  },
  serverMiddleware: ['~/api/index'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#8338ec', height: '3px' },
  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/infinitloading', ssr: false },
    '~/plugins/moment.js',
    { src: '~/plugins/probar.js', ssr: false }
    // { src: '~/plugins/grid', ssr: false },
    // { src: '~/plugins/modal' }

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/device',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ],
    ['nuxt-lazy-load', {
      images: true,
      videos: true,
      audios: true,
      iframes: true,
      native: false,
      polyfill: true,
      directiveOnly: false,

      defaultImage: '/cover2.jpg',
      loadingClass: 'isLoading',
      loadedClass: 'isLoaded',
      appendClass: 'lazyLoad',
      observerConfig: {
      }
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:3000/api'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: false
        // globalToken: true,
      },
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    build: {
      vendor: ['jquery', 'bootstrap'],
      plugins: [
        // set shortcuts as global for bootstrap
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        })
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      config.module.rules.forEach((rule) => {
        if (String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
        // add a second loader when loading images
          rule.use.push({
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [
                // use these settings for internet explorer for proper scalable SVGs
                // https://css-tricks.com/scale-svg/
                  { removeViewBox: false },
                  { removeDimensions: true }
                ]
              }
            }
          })
        }
      })
    }
  }
}
