<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image" /></a>
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
    <template v-if="user.username === article.author.username">
      <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{
          name: 'editor-slug',
          params: {
              slug: article.slug
          }
      }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" @click="changeFollow">
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? "Unfollow" : "Follow" }}
        {{ article.author.username }} <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
        @click="editFavorite(article.slug)"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { followUser, unfollowUser } from "@/api/auth.js";
import { mapState } from "vuex";
import {
  favoriteArticle,
  unfavoriteArticle,
  removeArticle,
} from "@/api/article";
export default {
  name: "articleauthor",
  props: {
    article: Object,
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    async changeFollow() {
      const { author } = this.article;
      if (author.following) {
        await unfollowUser(author.username);
        author.following = false;
      } else {
        await followUser(author.username);
        author.following = true;
      }
    },
    async editFavorite(slug) {
      this.article.favorited = !this.article.favorited;
      if (this.article.favorited) {
        await favoriteArticle(slug);
        this.article.favoritesCount++;
      } else {
        await unfavoriteArticle(slug);
        this.article.favoritesCount--;
      }
    },
    async deleteArticle() {
      await removeArticle(this.article.slug);
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>