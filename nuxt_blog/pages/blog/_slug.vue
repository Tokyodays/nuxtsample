<template>
  <section class="slug">
    <p>{{ post.fields.category.fields.name }}</p>
    <h1 class="slug_title">{{ post.fields.title }}</h1>
    <p class="slug_date">
      {{ (new Date(post.fields.publishedAt)).toLocaleDateString() }}
    </p>
    <img class="slug_image" :src="setEyeCatch(post.fields.headerImage).url"/>
    <div v-html="$md.render(post.fields.body)"></div>
  </section>
</template>

<script>
import {contentfulCreateClient} from '~/plugins/contentful.js'
import { mapState, mapGetters } from 'vuex'
const client = contentfulCreateClient()

export default {
  transition: 'slide-left',
  components: {
    
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
  },
  async asyncData ({ env, params }) {
    return await client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': params.slug,
      order: '-sys.createdAt'
    }).then(entries => {
      return {
        post: entries.items[0],
      }
    })
    .catch(console.error)
  }
}
</script>

<style scoped>
.slug {
  max-width: 800px;
  margin: 0 auto;
}
.slug_title {
  font-size: 2.0rem;
  font-weight: bolder;
}
.slug_date {
  font-size: 1.0rem;
  color: rgb(57, 72, 85);
  text-align: right;
}
</style>