<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-author :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-author :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="comment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button
                class="btn btn-sm btn-primary"
                @click.prevent="addComment"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">{{ comment.body }}</p>
            </div>
            <div class="card-footer">
              <nuxt-link
                class="comment-author"
                :to="{
                  name: 'profile',
                  params: {
                    profile: `@${comment.author.username}`,
                  },
                }"
              >
                <img :src="comment.author.image" class="comment-author-img" />
              </nuxt-link>
              &nbsp;
              <nuxt-link
                class="comment-author"
                :to="{
                  name: 'profile',
                  params: {
                    profile: `@${comment.author.username}`,
                  },
                }"
              >
                {{ comment.author.username }}
              </nuxt-link>
              <span class="date-posted">{{ comment.createdAt | date() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArticle, getComments, addComment } from "@/api/article";
import articleAuthor from "@/components/articleauthor.vue";
import MartdownIt from 'markdown-it'
export default {
  name: "articleIndex",
  components: {
    "article-author": articleAuthor,
  },
  async asyncData({ params }) {
    const [{ article }, { comments }] = await Promise.all([
      getArticle(params.slug),
      getComments(params.slug),
    ]);
    const md = new MartdownIt();
    article.body = md.render(article.body);
    console.log(article);
    return {
      article,
      comments,
    };
  },
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  methods: {
    async addComment() {
      const { comment } = await addComment(this.article.slug, this.comment);
      this.comments.unshift(comment)
    },
  },
};
</script>

<style>
</style>