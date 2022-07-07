import { Vue } from "vue-property-decorator";

export default class AuthApi extends Vue {
  private static authApiInstance: AuthApi;

  public async login(): Promise<Record<string, Record<string, string>>> {
    try {
      await (this as any).$gAuth.signOut();
      const token = await (this as any).$gAuth.signIn();
      return token;
    } catch (exp) {
      console.error(exp);
    }
  }

  static getAuthApiInstance(): AuthApi {
    if (AuthApi.authApiInstance) {
      return AuthApi.authApiInstance;
    } else {
      return (AuthApi.authApiInstance = new AuthApi());
    }
  }
}
