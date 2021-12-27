<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'your',
                  }"
                  :to="{
                    name: 'index',
                    query: {
                      tab: 'your',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'global',
                  }"
                  :to="{
                    name: 'index',
                    query: {
                      tab: 'global',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tab === 'tag'">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  :to="{
                    name: 'index',
                    query: {
                      tab: 'tag',
                    },
                  }"
                  >#{{tag}}</nuxt-link
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
                    name: 'index',
                    query: {
                      tab,
                      page: item,
                      limit,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
              <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                :to="{
                  name: 'index',
                  query: {
                    tab: 'tag',
                    tag
                  },
                }"
                v-for="tag in tags"
                :key="tag"
              >{{tag}}</nuxt-link>

              <div class="post-preview" v-if="tags.length === 0">
                No tags are here... yet.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, getTags } from "@/api/article";
import { mapState } from "vuex";
import articlepreview from "@/components/articlepreview.vue";
export default {
  name: "realWorldIndex",
  components: {
    "article-preview": articlepreview,
  },
  async asyncData({ query }) {
    const tab = query.tab || "global";
    const tag = query.tag;
    const limit = parseInt(query.limit) || 1;
    const page = parseInt(query.page) || 1;
    const offset = (page - 1) * limit;
    const getArticleList = (tab === "global" || tab === "tag") ? getArticles : getFeedArticles;
    const [{ articles, articlesCount }, { tags }] = await Promise.all([
      getArticleList({ limit, offset, tag }),
      getTags(),
    ]);
    return {
      articles,
      limit,
      page,
      totalCount: articlesCount,
      tab,
      tags,
      tag
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    totalPage: function () {
      return Math.ceil(this.totalCount / this.limit);
    },
  },
  watchQuery: ["limit", "page", "tab"],
  methods: {
    changePage(item) {
      this.page = item;
    },
  },
};
</script>

<style>
</style>