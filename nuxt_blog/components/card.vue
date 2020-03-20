<template>
  <article class="card">
    <nuxt-link :to="{ name: 'blog-slug', params: { slug: slug }}" class="wrapper">
      <img class="card_image" 
      :src="setEyeCatch(headerImage).url"
      :alt="setEyeCatch(headerImage).title" />
      <h1 class="card_title">{{ title }}</h1>
      <p class="card_date">{{ (new Date(publishedAt)).toLocaleDateString() }}</p>
    </nuxt-link>
    <p :class="categoryColor(category)">{{ category.name }}</p>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['title', 'slug', 'headerImage', 'publishedAt', 'category'],
  computed: {
    ...mapGetters(['setEyeCatch']),
    categoryColor() {
      return (category) => {
        switch (category.name) {
          case '松戸': return 'card_color1'
          case '知恵蔵師匠': return 'card_color2'
          default: return 'color_default'
        }
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  height: 300px;
  box-shadow: 1px 2px 3px 1px rgba(0,0,0,0.2);
  border: 0.5px solid rgb(57, 72, 85);
  padding: 10px 20px;
  margin: 10px 10px;
  text-align: center;
}
.wrapper {
  text-decoration: none;
}
.card_title {
  font-size: 1.2rem;
}
.card_date {
  font-size: 0.7rem;
  color: rgb(57, 72, 85);
  text-align: right;
}
.card_image {
  max-height: 100px;
}
.card_color1 {
  background-color: #C73A31;
}
.card_color2 {
  background-color: #236244;
}
.color_default {
  background-color: #666;
}
</style>