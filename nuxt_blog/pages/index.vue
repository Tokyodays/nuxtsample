<template>
  <section class="index">
    <card v-for="post in posts"
      v-bind:key="post.fields.slug"
      :title="post.fields.title"
      :slug="post.fields.slug"
      :headerImage="post.fields.headerImage"
      :publishedAt="post.fields.publishedAt"
      :category="post.fields.category.fields"
    />
  </section>
</template>

<script>
import Card from '~/components/card.vue'
import { mapState } from 'vuex'

export default {
  transition: 'slide-left',
  components: {
    Card
  },
  computed: {
    ...mapState(['posts'])
  }

}
</script>

<style scoped>
.index {
  display: flex;
  flex-wrap: wrap;
}
</style>