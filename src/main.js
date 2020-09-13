import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import SpotifyWebApi from "spotify-web-api-js";

Vue.prototype.$spotifyApi = new SpotifyWebApi();
Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:5000"
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
