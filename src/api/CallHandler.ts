import Axios from "axios-observable";
import { Vue } from "vue-property-decorator";
export default class CallHandler extends Vue {
  private static databaseHandler: Axios | null;

  static async createCallHandler(config: {
    headers: { Authorization: string };
  }): Promise<void> {
    CallHandler.databaseHandler = Axios.create({
      baseURL: "http://localhost:8080/",
      timeout: 1000,
      headers: config.headers,
    });
  }

  static getCallHandler(): Axios {
    if (CallHandler.databaseHandler) {
      return CallHandler.databaseHandler;
    }
  }
}
