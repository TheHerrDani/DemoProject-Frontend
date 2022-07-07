import { Component, Vue, Watch } from "vue-property-decorator";
import {
  BButton,
  BCol,
  BContainer,
  BFormInput,
  BIcon,
  BRow,
} from "bootstrap-vue";
import AuthApi from "../../api/AuthApi";
import TokenStore from "../../store/TokenStore";
import UserApi from "@/api/UserApi";
import CallHandler from "@/api/CallHandler";
import SocketApi from "@/api/SocketApi";

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