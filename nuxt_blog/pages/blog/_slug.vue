<template>
  <section class="slug">
    <p>{{ currentPost.fields.category.fields.name }}</p>
    <h1 class="slug_title">{{ currentPost.fields.title }}</h1>
    <p class="slug_date">
      {{ (new Date(currentPost.fields.publishedAt)).toLocaleDateString() }}
    </p>
    <img class="slug_image" :src="setEyeCatch(currentPost.fields.headerImage).url"/>
    <div v-html="$md.render(currentPost.fields.body)"></div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  transition: 'slide-left',
  components: {
    
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
  },
  async asyncData({ payload, store, params, error }) {
    const currentPost = payload || await store.state.posts.find(post => post.fields.slug === params.slug)

    if (currentPost) {
      return { currentPost }
    } else {
      return error({ statusCode: 400 })
    }
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