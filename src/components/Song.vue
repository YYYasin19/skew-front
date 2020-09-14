<template>
  <div class="columns is-vcentered">
    <div class="column is-narrow">
      <img class="song-image" :src="song.album.images[1].url" alt="" />
    </div>
    <div class="column">
      <div class="box song-data">
        <h1 class="is-size-3 has-text-left">{{ song.name }}</h1>

        <div>Votes: {{ upvote_users }}</div>
        <b-button outlined type="is-primary" @click="voteSong(song.uri)">
          Vote
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { socketActions } from "../mixins";

export default {
  name: "Song",
  mixins: [socketActions],
  props: ["song", "upvote_users"]
};
</script>

<style lang="scss" scoped>
.song-image {
  height: 100px;
  width: 100px;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1);
  transition: 0.4s ease;
}

.song-data {
  min-height: 100px;
}
</style>
