
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      },

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      {
          src: '~/plugins/vee-validate'
      }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
      '@nuxtjs/axios',
      '@nuxtjs/auth'
  ],
    // axios: {
    //     baseURL: 'http://localhost:9000/api'
    // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
    axios: {
        baseURL: 'http://localhost:9000/api'
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/signin', method: 'post', propertyName: 'token' },
                    logout: false,
                    user: { url: 'http://localhost:9000/api/users/me', propertyName: false },
                },
                tokenRequired: true,
                globalToken: true,
                tokenType: false,

                tokenName: 'X-Auth-Token'
            }
        },
        redirect: {
            login: "/login",
            logout: "/login",
            home: '/'



        }
    },
}
