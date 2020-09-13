import Vue from "vue";
import Vuex from "vuex";
import SpotifyWebApi from "spotify-web-api-js";
let api = new SpotifyWebApi();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: {},
    sessionAuthentication: {},
    sessionStatus: {
      connected: false,
      inSession: false
    },
    spotify: {
      authenticated: false,
      auth: {
        redirect_uri: ""
      },
      userProfile: {
        userName: "",
        lovedSongs: []
      },
      search: {
        results: []
      }
    }
  },
  mutations: {
    SET_SESSION_DATA(state, sessionData) {
      state.session = sessionData;
    },
    SET_SESSION_AUTH_DATA(state, token) {
      state.sessionAuthentication.token = token;
    },
    SET_SPOTIFY_ACCESS_TOKEN(state, accessToken) {
      state.spotify.auth.accessToken = accessToken;
      api.setAccessToken(accessToken);
      state.spotify.authenticated = true;
    },
    SET_USER_PROFILE(state, data) {
      state.spotify.userProfile = data;
    },
    SET_SPOTIFY_SEARCH_RESULTS(state, results) {
      state.spotify.search.results = results;
    },
    SET_CURRENT_PLAYBACK(state, playback) {
      state.session.current_playback = playback;
    },
    SET_SESSION_STATUS_CONNECTED(state, data) {
      state.sessionStatus.connected = data["connected"];
    },
    SET_SESSION_STATUS_IN_SESSION(state, data) {
      state.sessionStatus.inSession = data["inSession"];
    }
  },
  actions: {
    setSessionData({ commit }, sessionData) {
      // validate data
      console.log("Action: setSessionData", sessionData);
      if (sessionData) {
        if (sessionData.name && sessionData._id) {
          // make commit
          commit("SET_SESSION_DATA", sessionData);
        }
      }
    },
    setSessionAuthData({ commit }, token) {
      commit("SET_SESSION_AUTH_DATA", token);
    },
    setSpotifyAccessToken({ commit }, data) {
      console.log("Action: setSpotifyAccessToken with", data);
      if (data) {
        commit("SET_SPOTIFY_ACCESS_TOKEN", String(data));
      }
    },
    async loadSpotifyUserProfile({ commit }) {
      console.log("Action: loadSpotifyUserProfile");
      api.getMe().then(myProfile => {
        console.log("Action loadSpotifyUserProfile", myProfile);
        commit("SET_USER_PROFILE", myProfile);
      });
    },
    async spotifySearch({ commit }, queryTerm) {
      let searchResults = await api.searchTracks(queryTerm, {
        limit: 10
      });
      console.log("Search results for " + queryTerm + ": ", searchResults);
      commit("SET_SPOTIFY_SEARCH_RESULTS", searchResults.tracks.items);
    },
    async loadCurrentPlayback({ commit }) {
      api.getMyCurrentPlaybackState().then(playbackData => {
        console.log("Action: loadCurrentPlayback", playbackData);
        commit("SET_CURRENT_PLAYBACK", playbackData);
      });
    },
    updateSessionStatusConnected({ commit }, data) {
      if (data && data.connected) {
        commit("SET_SESSION_STATUS_CONNECTED", data);
      }
    },
    updateSessionStatusInSession({ commit }, data) {
      if (data && data.inSession) {
        commit("SET_SESSION_STATUS_IN_SESSION", data);
      }
    }
  }
});
