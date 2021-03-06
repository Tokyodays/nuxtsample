const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
  'host'
])
const {contentfulCreateClient} = require('./plugins/contentful')
const client = contentfulCreateClient(ctfConfig)

require('dotenv').config()

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
      config.node={
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
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: ctfConfig.CTF_BLOG_POST_TYPE_ID
        })
      ]).then(([ posts ]) => {
        return [
          ...posts.items.map(post => {
            return { route: `blog/${post.fields.slug}`, payload: post }
          })
        ]
      })
    }
  },

  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_CDA_PREVIEW_ACCESS_TOKEN: ctfConfig.CTF_CDA_PREVIEW_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
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

