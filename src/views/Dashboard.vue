<template>
  <div>
    <CurrentPlayback></CurrentPlayback>
    <hr />
    <div class="container is-fluid">
      <div v-for="song in session.songs" :key="song.song_data.uri">
        <Song :song="song.song_data" :upvote_users="song.upvote_users"></Song>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CurrentPlayback from "../components/CurrentPlayback";
import Song from "../components/Song";

export default {
  name: "Dashboard",
  components: {
    CurrentPlayback,
    Song
  },
  computed: {
    ...mapState(["session"])
  }
};
</script>

<style></style>
