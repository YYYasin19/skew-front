<template>
  <div id="navbar">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <div v-if="session">
              <a class="button is-light">
                Leave Session
              </a>
            </div>
            <div v-else>
              <a
                class="button is-dark"
                tag="router-link"
                :to="{ path: '/join' }"
              >
                Join a session
              </a>
              <a class="button is-primary">
                Create your own
              </a>
            </div>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapState["session"]
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  color: red;
}
</style>
