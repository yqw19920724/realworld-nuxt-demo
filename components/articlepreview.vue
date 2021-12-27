<template>
  <div>
    <div
      class="article-preview"
      v-for="article in articles"
      :key="article.slug"
    >
      <div class="article-meta">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              profile: `@${article.author.username}`,
            },
          }"
          ><img :src="article.author.image"
        /></nuxt-link>
        <div class="info">
          <nuxt-link
            class="author"
            :to="{
              name: 'profile',
              params: {
                profile: `@${article.author.username}`,
              },
            }"
            >{{ article.author.username }}</nuxt-link
          >
          <span class="date">{{ article.createdAt | date() }}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{
            active: article.favorited,
          }"
          @click="editFavorite(article.slug)"
        >
          <i class="ion-heart"></i> {{ article.favoritesCount }}
        </button>
      </div>
      <nuxt-link
        class="preview-link"
        :to="{
          name: 'article-slug',
          params: {
            slug: article.slug,
          },
        }"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.body }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>

    <div class="article-preview" v-if="articles.length === 0">
      No articles are here... yet.
    </div>
  </div>
</template>

<script>
import { favoriteArticle, unfavoriteArticle } from "@/api/article";
export default {
  name: "articlepreviewIndex",
  props: {
    articles: Array,
  },
  methods: {
    async editFavorite(slug) {
      const article = this.articles.find((article) => article.slug === slug);
      if (article) {
        article.favorited = !article.favorited;
        if (article.favorited) {
          await favoriteArticle(slug);
          article.favoritesCount++;
        } else {
          await unfavoriteArticle(slug);
          article.favoritesCount--;
        }
      }
    },
  },
};
</script>

<style>
</style>