<template>
  <div class="hello">
    <button @click="login">
      Login
    </button>

    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
          >router</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
          target="_blank"
          rel="noopener"
          >vuex</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      client_id: "f4233a4c37b445d08eef707987b11ac8",
      base_url: "https://accounts.spotify.com/authorize",
      redirect_uri: "http://localhost:8080/"
    };
  },

  mounted() {
    this.token = window.location.hash
      .substr(1)
      .split("&")[0]
      .split("=")[1];
    // this.token = "TOKEN IS HERE";
    if (this.token) {
      console.log(this.token);

      window.opener.spotifyCallback(this.token);
    }
  },
  methods: {
    /* deprecated */
    loadSpotifyAuth() {
      const params = new URLSearchParams({
        client_id: this.client_id,
        response_type: "token",
        redirect_uri: this.redirect_uri
      });

      //let token = "BQDm1fE3mJzvAFfbNdpjrlUyh3Dwmkh1FEygkrryttN84NAmaAGLufYh4PvfxgEXL0RdTdUadjrnQhz338XzuToXp6l6fWSFCGBv0VF81mU5VMqusftq-6MnxTHX8K5KzvM3IfbRkub3DzIH";
      let authUrl = `${this.base_url}?${params.toString()}`;
      window.location.href = authUrl;
    },

    login() {
      let popup = window.open(
        `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&show_dialog=true`,
        "Login with Spotify",
        "width=800,height=600"
      );

      window.spotifyCallback = payload => {
        popup.close();

        // fetches data
        fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${payload}`
          }
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            // here we get the user data
            this.msg = data;
          });
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
