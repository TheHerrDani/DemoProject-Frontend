import { Vue } from "vue-property-decorator";
import User from "../types/user";
import CallHandler from "./CallHandler";

export default class UserApi extends Vue {
  private static userApiInstance: UserApi;

  private databaseHandler = CallHandler.getCallHandler();

  public async findAllUser(setter: (users: Array<User>) => void): Promise<void> {
    this.databaseHandler.get<Array<User>>("/api/user/find-all").subscribe({
      next: (response) => setter(response.data),
      error: (error) => console.error(error),
    });
  }

  public saveIfNotExist(user: User): void {
    this.databaseHandler.post("/api/user/save-if-not-exist", user).subscribe({
      error: (error) => console.error(error),
    });
  }

  static getUserApiInstance(): UserApi {
    if (UserApi.userApiInstance) {
      return UserApi.userApiInstance;
    } else {
      return (UserApi.userApiInstance = new UserApi());
    }
  }
}
