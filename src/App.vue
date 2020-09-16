<template>
  <div id="app">
    <Navbar></Navbar>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  created() {},
  sockets: {
    updated_session: function(data) {
      if (typeof data == "string") {
        data = JSON.parse(data);
      }
      console.log("Socket: updated_session", data);

      let sessionData = data;
      if (sessionData) {
        console.log("Socket:updated_session", data);
        this.sessionData = sessionData;
        this.$store.dispatch("setSessionData", sessionData);
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
