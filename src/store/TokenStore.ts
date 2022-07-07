import User from "@/types/user";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "./store";

@Module({ dynamic: true, namespaced: true, name: "TokenStore", store })
class TokenStore extends VuexModule {
  loggedInUser: User | null = null;
  idToken = "";

  @Mutation
  public setTokenMutation(
    googleAccount: Record<string, Record<string, string>>
  ) {
    const personKey = Object.keys(googleAccount)[2];
    const person = googleAccount[personKey];
    const emailKey = Object.keys(person)[5];
    const fullNameKey = Object.keys(person)[1];
    const tokenKey = Object.keys(googleAccount)[1];
    this.loggedInUser = new User();
    this.loggedInUser.emailAddress = person[emailKey];
    this.loggedInUser.fullName = person[fullNameKey];
    this.idToken = googleAccount[tokenKey].id_token;
  }

  @Action({ commit: "setTokenMutation", rawError: true })
  public setToken(googleAccount: Record<string, Record<string, string>>) {
    return googleAccount;
  }

  public get getHeaderConfig(): { headers: { Authorization: string } } | null {
    return { headers: { Authorization: `Bearer ${this.idToken}` } };
  }

  public get isLoggedIn(): boolean {
    if (this.idToken && this.idToken.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
export default getModule(TokenStore);
