<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!--
    <HelloWorld msg="Welcome to Your Vue.js App" />
    -->
    <SocketStatus></SocketStatus>
    <SpotifyStatus></SpotifyStatus>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import SocketStatus from "@/components/SocketStatus.vue";
import SpotifyStatus from "@/components/SpotifyStatus.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    SocketStatus,
    SpotifyStatus
  }
};
</script>
