<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from "@/api/article";
export default {
  name: "editorIndex",
  middleware: ["authorization"],
  async asyncData({ params }) {
    const slug = params.slug;
    const article = {
      title: "",
      body: "",
      description: "",
      tagList: "",
    };
    if (slug) {
      const { article: art } = await getArticle(slug);
      article.title = art.title
      article.body = art.body
      article.description = art.description
      article.tagList = art.tagList.join(' ')
    }

    return {
      article,
      slug,
    };
  },
  methods: {
    async onSubmit() {
        const data = {
          article: {
            ...this.article,
            tagList: this.article.tagList.split(" "),
          },
        }
        let article;
        if (this.slug) {
             ({ article } = await updateArticle(this.slug, data));
        } else {
            ({ article } = await createArticle(data));
        }
        this.$router.push(`/article/${article.slug}`);
    }
  },
};
</script>

<style>
</style>