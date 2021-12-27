<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="auth.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="auth.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="auth.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="auth.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="auth.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.prevent="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { updateAuth } from '@/api/auth'
import { cookie } from "@/util";
export default {
  name: "settingindex",
  middleware: ["authorization"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    auth: function () {
      return {
        image: this.user.image,
        username: this.user.username,
        bio: this.user.bio,
        email: this.user.email,
        password: ''
      };
    },
  },
  methods: {
    ...mapMutations({
      setUser: "user/setUser",
    }),
    // 退出登陆
    logout: function () {
      this.setUser("");
      cookie.remove('user')
      this.$router.push("/");
    },
    updateUser: async function () {
      await updateAuth({user: this.auth})
    },
  },
};
</script>

<style>
</style>