<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <template v-if="isLogin">
            <h1 class="text-xs-center">Sign in</h1>
            <p class="text-xs-center">
              <a href="">Need an account?</a>
            </p>
          </template>
          <template v-else>
            <h1 class="text-xs-center">Sign up</h1>
            <p class="text-xs-center">
              <a href="">Have an account?</a>
            </p>
          </template>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="message in messages" :key="message">{{field}} {{message}}</li>
            </template>
          </ul>

          <form>
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="onSubmit"
            >
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi, registerApi } from "@/api/auth";
import { mapMutations } from "vuex";
import { cookie } from "@/util";
export default {
  name: "authIndex",
  middleware: ['unauthorization'],
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {} //错误信息
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    ...mapMutations({
      setUser: "user/setUser",
    }),
    async onSubmit() {
      const submit = this.isLogin ? loginApi : registerApi
      try {
        const { user } = await submit({ user: this.user })
        // 将user信息保存到vuex中
        this.setUser(user)
        if (cookie) cookie.set("user", JSON.stringify(user))
        this.$router.push('/')
      } catch (err) {
        console.dir(err);
        this.errors = err.response.data.errors
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>