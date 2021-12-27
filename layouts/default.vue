<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" exact to="/">Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact
                :to="{
                  name: 'editor-slug',
                }"
              >
                <i class="ion-compose"></i>&nbsp;New Article
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact
                :to="{
                  name: 'settings',
                }"
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact
                :to="{
                  name: 'profile',
                  params: {
                    profile: `@${user.username}`,
                  },
                }"
              >
                <img class="user-pic" :src="user.image" />
                {{ user.username }}
              </nuxt-link>
            </li>
          </template>
          <template v-if="!user">
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'login',
                }"
                >Sign in</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'register',
                }"
                >Sign up</nuxt-link
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt />
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
};
</script>

<style>
</style>