require('dotenv').config()

const {contentfulCreateClient} = require('./plugins/contentful')
const cdaClient = contentfulCreateClient()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt_blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.node =  {
        fs: "empty"
      }
    }
  },

  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],

  plugins: [
    { src: '~plugins/contentful' } 
  ],

  router: {
    middleware: [
      'getContentful'
    ]
  },

  generate: {
    routes () {
      return cdaClient.getEntries({
        'content_type': cdaClient.CTF_BLOG_POST_TYPE_ID
      }).then(entries => {
        return [
          ...entries.items.map(entry => `/blog/${entry.fields.slug}`)
        ]
      })
    }
  },

  env: {
    CTF_SPACE_ID: cdaClient.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: cdaClient.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: cdaClient.CTF_BLOG_POST_TYPE_ID
  },

  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true,  // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    use: [
      'markdown-it-toc' // 目次を作るためのライブラリ。別途インストールが必要
    ]
  }
}

