<template>
  <div>
    <h2>Spotify Status</h2>
    <button @click="login">
      Login
    </button>
    <div id="spotify-info-container">
      <button @click="loadCurrentPlayback">
        Load Playback Information
      </button>
      <div id="current-playback-data">
        <div v-if="session.current_playback">
          <div>Titel: {{ session.current_playback.item.name }}</div>
          <div>Gerät: {{ session.current_playback.device.name }}</div>
        </div>
        <div v-else>
          No playback information currently
        </div>
      </div>
      <CurrentPlayback></CurrentPlayback>
    </div>
    <hr />
    <div id="spotify-data">
      <h2>Spotify Information from API</h2>
      <div>
        {{ spotify.userProfile }}
      </div>
    </div>
    <div id="spotify-search">
      <h3>Spotify Search</h3>
      <input v-model="searchString" />
      <button @click="search">Search</button>
      <div id="search-result-container">
        <div v-for="entity in spotify.search.results" :key="entity.uri">
          {{ entity.name }}
        </div>
      </div>
      <button @click="addFirstSongToSession">
        Add First to Session
      </button>
    </div>
  </div>
</template>

<script>
import { socketActions } from "../mixins";
import { mapState } from "vuex";
import CurrentPlayback from "./CurrentPlayback";

export default {
  name: "SpotifyStatus",
  components: {
    CurrentPlayback
  },
  mixins: [socketActions],
  data() {
    return {
      spotify_auth: {
        client_id: "f4233a4c37b445d08eef707987b11ac8",
        base_url: "https://accounts.spotify.com/authorize",
        redirect_uri: "http://localhost:8080/",
        access_token: ""
      },
      spotify_data: {
        sample: "This is the first data"
      },
      searchString: "",
      scopes: [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing"
      ]
    };
  },
  computed: {
    ...mapState(["spotify", "session"])
  },
  mounted() {
    this.spotify_auth.access_token = window.location.hash
      .substr(1)
      .split("&")[0]
      .split("=")[1];
    console.log("We were at mounted");
    // if the token exists, print it
    if (this.spotify_auth.access_token) {
      console.log(this.spotify_auth.access_token);

      window.opener.spotifyCallback(this.spotify_auth.access_token);
    }
  },
  methods: {
    addFirstSongToSession() {
      let data = {
        token: this.$store.state.sessionAuthentication.token,
        song: this.$store.state.spotify.search.results[0]
      };
      console.log(
        "Adding first song",
        this.$store.state.spotify.search.results[0]
      );

      this.$socket.emit("add_song", data);
    },
    search() {
      this.$store.dispatch("spotifySearch", this.searchString);
    },
    loadCurrentPlayback() {
      if (this.$store.state.spotify.authenticated) {
        this.$store.dispatch("loadCurrentPlayback");
      }
    },

    login() {
      let popup = window.open(
        `https://accounts.spotify.com/authorize?client_id=${
          this.spotify_auth.client_id
        }&response_type=token&redirect_uri=${
          this.spotify_auth.redirect_uri
        }&scope=${this.scopes.join(" ")}&show_dialog=true`,
        "Login with Spotify",
        "width=800,height=600"
      );
      console.log("We came here to lign");
      // this is called, when to login was successful
      window.spotifyCallback = payload => {
        // close the login popup
        popup.close();
        console.log("Spotify Login Callback Started");
        this.$store.dispatch("setSpotifyAccessToken", payload);
        console.log("Access token set?");
        this.$store.dispatch("loadSpotifyUserProfile");
      };
    }
  }
};
</script>

<style></style>
