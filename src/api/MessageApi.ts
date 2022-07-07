import { Vue } from "vue-property-decorator";
import Message from "@/types/message";
import CallHandler from "./CallHandler";

export default class MessageApi extends Vue {
  private static messageApiinstance: MessageApi;

  private databaseHandler = CallHandler.getCallHandler();
  public getMessages(
    fromEmail,
    toEmail,
    setter: (messages: Array<Message>) => void
  ): void {
    const params = { params: { fromEmail: fromEmail, toEmail: toEmail } };
    this.databaseHandler
      .get<Array<Message>>("/api/message/find-all-by-users", params)
      .subscribe({
        next: (response) => setter(response.data),
        error: (error) => console.error(error),
      });
  }

  static getMessageApiInstance(): MessageApi {
    if (MessageApi.messageApiinstance) {
      return MessageApi.messageApiinstance;
    } else {
      return (MessageApi.messageApiinstance = new MessageApi());
    }
  }
}
