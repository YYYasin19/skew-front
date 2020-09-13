<template>
  <div class="hello">
    <button @click="login">
      Login
    </button>
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
      spotify_auth: {
        client_id: "f4233a4c37b445d08eef707987b11ac8",
        base_url: "https://accounts.spotify.com/authorize",
        redirect_uri: "http://localhost:8080/",
        token: ""
      },
      socketMessage: "",
      roomNumber: "",
      eventMessages: [{ message: "Start of Component", timestamp: "Start" }],
      loggedIn: false,
      session: ""
    };
  },
  sockets: {
    connect: function() {
      this.eventMessages.push({
        message: "Conncected",
        timestamp: new Date()
      });

      // if we have a session: try to login at every connect
      if (this.session) {
        // login registers us to server events
        this.socketLogin();
      }
    },
    disconnect: function() {
      this.eventMessages.push({
        message: "DISconnected",
        timestamp: new Date()
      });
      this.loggedIn = false;
    },
    "test-response": function(data) {
      let socketBox = document.getElementById("socket-messages");
      let div = document.createElement("div");
      div.innerHTML = data["data"];
      socketBox.append(div);
    },
    "message-response": function(data) {
      let socketBox = document.getElementById("socket-messages");
      let div = document.createElement("div");
      div.innerHTML = `${data["client_id"]}: ${data["data"]}`;
      socketBox.append(div);
    }
  },
  mounted() {
    this.spotify_auth.token = window.location.hash
      .substr(1)
      .split("&")[0]
      .split("=")[1];

    // if the token exists, print it
    if (this.spotify_auth.token) {
      console.log(this.spotify_auth.token);

      window.opener.spotifyCallback(this.spotify_auth.token);
    }
  },
  methods: {
    socketLogin() {
      let sessionId = "";
      let name = "";
      let password = "";

      // send server these informations so they take us in the room
      this.$socket.emit("join_session", {
        session_id: sessionId,
        password: password,
        name: name
      });

      // update our app state
      this.loggedIn = true;
    },
    createSession() {
      let name = "";
      let password = "";

      this.$socket.emit("create_session", {
        password: password,
        name: name
      });
    },
    joinRoom() {
      this.$socket.emit("join-room", {
        room_id: this.roomNumber
      });
    },
    sendMessage() {
      this.$socket.emit("client-message", this.socketMessage);
    },
    sendMessageRoom() {
      this.$socket.emit("client-message-room", {
        data: this.socketMessage
      });
    },
    /**
     * performs the spotify login operation
     */
    login() {
      let popup = window.open(
        `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&show_dialog=true`,
        "Login with Spotify",
        "width=800,height=600"
      );

      // this is called, when to login was successful
      window.spotifyCallback = payload => {
        // close the login popup
        popup.close();

        // store spotify data in vuex store
        this.$store.dispatch("updateSpotifyToken", payload);

        // fetch data
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
