import { Vue } from "vue-property-decorator";
import TokenStore from "../store/TokenStore";

export default class App extends Vue {
  
  get isLoggedIn(): boolean {
    return TokenStore.isLoggedIn;
  }
}