export const socketActions = {
  methods: {
    updateSession() {
      if (this.$store.state.sessionStatus.inSession) {
        // copy session data
        let sessionCopy = Object.assign({}, this.$store.state.session);

        // stringify currentPlayback if we have it
        if (sessionCopy.current_playback) {
          sessionCopy.current_playback = JSON.stringify(
            sessionCopy.current_playback
          );
        }

        this.$socket.emit("update_session", {
          token: this.sessionAuthData.token,
          session: this.$store.state.session
        });
      }
    },
    voteSong(uri) {
      this.$socket.emit("update_vote", {
        token: this.$store.state.sessionAuthentication.token,
        uri: uri
      });
    }
  }
};
