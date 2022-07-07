import Vue from "vue";
import App from "./app/App.vue";
import router from "./router/router";
import VueRx from "vue-rx";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import GAuth from "vue-google-oauth2";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import store from "./store/store";

const gauthOption = {
  clientId:
    "95959189499-6vcu2tpirp5lm6dc48glahrllrf20khg.apps.googleusercontent.com",
  scope: "profile email",
  plugin_name: "chat",
  prompt: "select_account",
};

Vue.config.productionTip = false;
Vue.use(GAuth, gauthOption);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRx);

new Vue({
  store: store,
  router,
  render: (h) => h(App),
}).$mount("#app");
