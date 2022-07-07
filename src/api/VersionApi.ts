import { Vue } from "vue-property-decorator";
import User from "../types/user";
import CallHandler from "./CallHandler";

export default class VersionApi extends Vue {
  private static versionApiInstance: VersionApi;

  private databaseHandler = CallHandler.getCallHandler();

  public async findVersion(setter: (version: string) => void): Promise<void> {
    this.databaseHandler.get<string>("/api/version/find").subscribe({
      next: (response) => setter(response.data),
      error: (error) => console.error(error),
    });
  }

  static getVersionApiInstance(): VersionApi {
    if (VersionApi.versionApiInstance) {
      return VersionApi.versionApiInstance;
    } else {
      return (VersionApi.versionApiInstance = new VersionApi());
    }
  }
}
