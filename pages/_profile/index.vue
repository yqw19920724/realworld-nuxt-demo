<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>{{ user.bio }}</p>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: !articleType,
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      profile: `@${user.username}`,
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: articleType,
                  }"
                  :to="{
                    name: 'profileArticleType',
                    params: {
                      profile: `@${user.username}`,
                      articleType: 'favorites',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <article-preview :articles="articles"></article-preview>

          <nav>
            <ul class="pagination">
              <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{
                  active: page === item,
                }"
                @click="changePage(item)"
              >
                <nuxt-link
                  exact
                  class="page-link"
                  :to="{
                    name: articleType ? 'profileArticleType' : 'profile',
                    query: {
                      page: item,
                      limit,
                    },
                    params: {
                      profile: `@${user.username}`,
                      articleType: articleType && 'favorites',
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
              <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import { getProfile } from "@/api/auth";
import articlepreview from "@/components/articlepreview";
export default {
  name: "profileIndex",
  components: {
    "article-preview": articlepreview,
  },
  async asyncData({ store, params, query }) {
    const articleType = params.articleType;
    const username = params.profile.slice(1);
    let articles = [];
    let totalCount = 0;
    const limit = parseInt(query.limit) || 1;
    const page = parseInt(query.page) || 1;
    const offset = (page - 1) * limit;

    const getArticleFn = async () => {
      if (articleType) {
        const data = await getArticles({
          favorited: username,
          limit,
          offset,
        });
        articles = data.articles;
        totalCount = data.articlesCount;
      } else {
        const data = await getArticles({ author: username, limit, offset });
        articles = data.articles;
        totalCount = data.articlesCount;
      }
    };
    const [{ profile }] = await Promise.all([
      getProfile(username),
      getArticleFn(),
    ]);
    return {
      user: profile,
      articles,
      totalCount,
      articleType,
      limit,
      page,
    };
  },
  watchQuery: ["limit", "page"],
  computed: {
    totalPage: function () {
      return Math.ceil(this.totalCount / this.limit);
    },
  },
  methods: {
    changePage(item) {
      this.page = item;
    },
  },
};
</script>

<style>
</style>