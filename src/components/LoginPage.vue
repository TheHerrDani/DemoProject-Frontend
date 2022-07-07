<template>
  <b-container fluid>
    <b-row class="justify-content-md-center">
      <b-col md="auto">
        <b-button variant="primary" @click="loginWithGoogle"
          ><b-icon icon="google"></b-icon
        ></b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import CallHandler from "@/api/CallHandler";
import SocketApi from "@/api/SocketApi";
import UserApi from "@/api/UserApi";
import {
  BButton,
  BCol,
  BContainer,
  BFormInput,
  BIcon,
  BRow,
} from "bootstrap-vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import AuthApi from "../api/AuthApi";
import TokenStore from "../store/TokenStore";

@Component({
  components: {
    BContainer,
    BFormInput,
    BRow,
    BCol,
    BButton,
    BIcon,
  },
})
export default class LoginPage extends Vue {
  async loginWithGoogle() {
    const googleAccount = await AuthApi.getAuthApiInstance().login();
    TokenStore.setToken(googleAccount);
  }

  get getHeaderConfig() {
    return TokenStore.getHeaderConfig;
  }

  @Watch("getHeaderConfig")
  login() {
    CallHandler.createCallHandler(TokenStore.getHeaderConfig);
    UserApi.getUserApiInstance().saveIfNotExist(TokenStore.loggedInUser);
    SocketApi.getSocketApi().connect();
  }
}
</script>
