const contentful = require('contentful')
const defaultConfig = (process.env.NODE_ENV === 'development') ? {
  CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_PREVIEW_ACCESS_TOKEN,
  host: 'preview.contentful.com'
} : {
  CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
  host: 'cdn.contentful.com'
}

module.exports = {
  contentfulCreateClient(config = defaultConfig) {
    console.log(config.host)
    console.log(config.CTF_CDA_ACCESS_TOKEN)
    return contentful.createClient({
      space: config.CTF_SPACE_ID,
      accessToken: config.CTF_CDA_ACCESS_TOKEN,
      host: config.host
    })
  }
}