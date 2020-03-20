import defaultEyeCatch from '~/assets/images/defaultEyeCatch.jpg'
import {contentfulCreateClient} from '~/plugins/contentful.js'
const client = contentfulCreateClient()

// 追記
export const state = () => ({
  posts: []
})

export const getters = {
  setEyeCatch: () => (image) => {
    if (!!image && !!image.fields) return { url: `https:${image.fields.file.url}`, title: image.fields.title }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  }
}


// 追記
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }

}

// 追記
export const actions = {
    async getPosts({ commit }) {
        return await client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
            order: '-fields.publishedAt',
        }).then(entries => {
            commit('setPosts', entries.items)
        })
        .catch(console.error)
    }
}