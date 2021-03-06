require('dotenv').config()

function getValidConfig (configEnv, keys) {
  let {config, missingKeys} = keys.reduce((acc, key) => {
    if (!configEnv[key]) {
      acc.missingKeys.push(key)
    } else {
      acc.config[key] = configEnv[key]
    }
    return acc
  }, {config: {}, missingKeys: []})

  if (missingKeys.length) {
    throw new Error(`Contentful key is missing : ${missingKeys.join(', ')}`)
  }
  return config
}

module.exports = {
  getConfigForKeys (keys) {

    const configEnv = (process.env.NODE_ENV === 'development') ? {
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
    return getValidConfig(configEnv, keys)
  }
}