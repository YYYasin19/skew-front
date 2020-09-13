<template>
  <div id="socket-container">
    <h2>Socket Status and Controls</h2>
    <div id="status-display">
      <div>Connected: {{ socketState.connected }}</div>
      <div>In Session: {{ socketState.inSession }}</div>
      <div v-if="socketState.inSession">Session Name: {{ session.name }}</div>
    </div>
    <hr />
    <div id="create-session">
      <input v-model="newSession.sessionName" placeholder="session name" />
      <input v-model="newSession.password" placeholder="password" />
      <button @click="createSession">Create Session</button>
    </div>
    <hr />
    <div id="join-session">
      <input v-model="sessionAuthData.sessionName" placeholder="session name" />
      <input v-model="sessionAuthData.userName" placeholder="user name" />
      <input v-model="sessionAuthData.password" placeholder="password" />
      <button @click="joinSession">
        Join Session
      </button>
    </div>
    <hr />
    <div id="message-in-session">
      <div id="message-container"></div>
      <input v-model="sessionMessage" />
      <button @click="sendMessage">Send Message</button>
    </div>
    <button @click="updateSession">
      Update Session
    </button>
    <hr />
    <div id="events">
      <div id="event-message-container">
        <h3>Events</h3>
        <div
          v-for="eMsg in eventMessages"
          :key="String(eMsg.timestamp)"
          class="event-message"
        >
          {{ eMsg.message }}
        </div>
      </div>
      <div id="error-message-container">
        <h3>Errors</h3>
        <div v-for="errMsg in errorMessages" :key="String(errMsg.timestamp)">
          {{ errMsg.message }}
        </div>
        <div v-if="errorMessages.length == 0">
          No errors currently.
        </div>
      </div>
    </div>
    <div id="session-state-container">
      <h3>Session Messages</h3>
      {{ session.messages }}
    </div>
    <div id="session-songs-container">
      <h3>Session Songs</h3>
      <div v-for="song in session.songs" :key="song.song_data.uri">
        {{ song.song_data.name }} ({{ song.upvote_users }})
        <button @click="voteSong(song.song_data.uri)">
          Vote
        </button>
        <img :src="song.song_data.album.images[1].url" alt="Alt" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { socketActions } from "../mixins";

export default {
  name: "SocketStatus",
  mixins: [socketActions],
  data() {
    return {
      eventMessages: [{ message: "Start of Component", timestamp: "Start" }],
      errorMessages: [],
      sessionAuthData: {
        userName: "",
        password: "",
        sessionName: "",
        token: ""
      },
      newSession: {
        sessionName: "",
        password: ""
      },
      socketState: {
        connected: false,
        inSession: false
      },
      sessionMessage: "",
      sessionData: {}
    };
  },
  computed: {
    ...mapState(["session"])
  },
  sockets: {
    connect: function() {
      this.eventMessages.push({
        message: "Conncected",
        timestamp: new Date()
      });

      if (
        this.sessionAuthData.sessionName &&
        this.sessionAuthData.userName &&
        this.sessionAuthData.password
      ) {
        this.joinSession();
      }

      this.$store.dispatch("updateSessionStatusConnected", { connected: true });
      this.socketState.connected = true;
    },
    disconnect: function() {
      this.eventMessages.push({
        message: "Disconnected",
        timestamp: new Date()
      });
      this.socketState.connected = false;
      this.socketState.inSession = false;
      this.$store.dispatch("updateSessionStatusConnected", {
        connected: false
      });
      this.$store.dispatch("updateSessionStatusInSession", {
        inSession: false
      });
    },
    created_session: function(data) {
      let responseSession = JSON.parse(data.session);
      // join this session with the corresponding data
      this.eventMessages.push({
        message: "Created session with id: " + responseSession["_id"],
        timestamp: new Date()
      });
      console.log(responseSession);

      // set the fields and join the session
      this.sessionAuthData.password = responseSession.password;
      this.sessionAuthData.sessionName = responseSession.name;
      this.sessionAuthData.userName = "Test" + String(Math.random(0, 100));
      this.joinSession();
    },
    send_token: function(data) {
      // save this users token
      this.sessionAuthData.token = data.token;
      this.$store.dispatch("setSessionAuthData", String(data.token));
      this.socketState.inSession = true;
      this.$store.dispatch("updateSessionStatusInSession", { inSession: true });
    },
    joined_session: function(data) {
      let responseData = data; // you can do some sanitizing here
      if (responseData) {
        console.log("Adding session data", JSON.parse(responseData.session));
        this.sessionData = JSON.parse(responseData.session);
        this.$store.dispatch(
          "setSessionData",
          JSON.parse(responseData.session)
        );

        this.socketState.inSession = true;
        this.$store.dispatch("updateSessionStatusInSession", {
          inSession: true
        });
      } else {
        console.log("Error: No session data was returned", data);
      }
    },
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
    },
    error_message: function(data) {
      this.errorMessages.push({
        message: data.message,
        timestamp: new Date()
      });
    }
  },
  methods: {
    parseJsonRecursive(obj) {
      for (var k in obj) {
        if (typeof obj[k] === "object" && obj[k] !== null) {
          this.parseJsonRecursive(obj[k]);
        } else if (Object.prototype.hasOwnProperty.call(obj, k)) {
          // if this string is a json: convert it to object and replace it
          let value = obj[k];
          if (typeof value === "string" && value !== "") {
            let parsedValue = JSON.parse(value);
            obj[k] = parsedValue;
          }
        }
      }
    },
    joinSession() {
      let sAuthData = this.sessionAuthData;
      console.log("Authentication with", sAuthData);
      if (sAuthData) {
        if (sAuthData.token && sAuthData.token !== "") {
          // use token authentication
          console.log("Joining session with token: " + sAuthData.token);
          this.$socket.emit("join_session", { token: sAuthData.token });
        } else {
          // use regular information for joining a session
          console.log("Joining session with auth data", this.sessionAuthData);
          this.$socket.emit("join_session", {
            session_name: this.sessionAuthData.sessionName,
            password: this.sessionAuthData.password,
            username: this.sessionAuthData.userName
          });
        }
      } else {
        // there is no information
        console.log("Can not join session. Missing data.");
        return;
      }
    },
    createSession() {
      this.$socket.emit("create_session", {
        password: this.newSession.password,
        session_name: this.newSession.sessionName
      });
    },

    sendMessage() {
      let msg = this.sessionMessage;

      this.sessionData.messages.push(msg);
      this.$socket.emit("update_session", {
        token: this.sessionAuthData.token,
        session: this.sessionData
      });
    },
    joinRoom() {
      this.$socket.emit("join-room", {
        room_id: this.roomNumber
      });
    },
    sendMessageRoom() {
      this.$socket.emit("client-message-room", {
        data: this.socketMessage
      });
    }
  }
};
</script>

<style></style>
