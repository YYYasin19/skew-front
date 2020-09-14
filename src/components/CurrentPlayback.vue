<template>
  <div class="container is-fluid">
    <div class="columns is-vcentered">
      <div class="column is-narrow ">
        <div v-if="session.current_playback">
          <a
            :href="session.current_playback.item.external_urls.spotify"
            target="_blank"
          >
            <img
              class="cpb-image"
              :src="session.current_playback.item.album.images[1].url"
              alt=""
            />
          </a>
        </div>
        <div v-else>
          <img
            src="https://via.placeholder.com/120x120"
            alt="Placeholder Image"
            class="cpb-image"
          />
        </div>
      </div>
      <div class="column">
        <div class="box has-text-justified cpb-data">
          <div v-if="session.current_playback">
            <div class="title">{{ session.current_playback.item.name }}</div>
            <div class="subtitle artist-names">
              <span
                v-for="artist in session.current_playback.item.artists"
                :key="artist.name"
              >
                {{ artist.name }}
              </span>
            </div>
            <b-progress
              type="is-success"
              :value="songProgress"
              size="is-small"
            ></b-progress>
          </div>
          <div v-else>
            <div>No data</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CurrentPlayback",
  computed: {
    ...mapState(["session"]),
    songProgress: function() {
      return Math.round(
        (this.session.current_playback.progress_ms /
          this.session.current_playback.item.duration_ms) *
          100
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.cpb-data {
}

.cpb-image {
  height: 120px;
  width: 120px;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1);
  transition: 0.4s ease;
}
</style>
