import TokenStore from "@/store/TokenStore";
import Message from "@/types/message";
import SockJS from "sockjs-client";
import { Vue } from "vue-property-decorator";
import webstomp, { Client, Frame } from "webstomp-client";
export default class SocketApi extends Vue {
  private static socketApi: SocketApi = new SocketApi();
  private socket: WebSocket;
  private stompClient: Client;
  private isLoggedIn = false;
  async connect() {
    if (this.isLoggedIn) {
      await this.diconect();
    }
    this.socket = new SockJS("http://localhost:8080/demo-project-app-websocket");
    this.stompClient = webstomp.over(this.socket);
    this.stompClient.connect(
      TokenStore.getHeaderConfig as any,
      (frame: Frame) => {
        this.isLoggedIn = true;
        console.info(frame);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  async diconect() {
    this.stompClient.disconnect();
    this.isLoggedIn = false;
  }

  subscribeToMessageStreamAsAdmin(adder: (message: Message) => void): void {
    SocketApi.getSocketApi().getStompClient.subscribe(
      "/sender/get-message/admin",
      (message) => {
        console.log("body", JSON.parse(message.body));
        const content: Message = JSON.parse(message.body) as Message;
        console.log("parsedMessage", content);
        adder(content);
      }
    );
  }

  subscribeToMessageStreamWithEmail(adder: (message: Message) => void): void {
    SocketApi.getSocketApi().getStompClient.subscribe(
      "/sender/get-message/" + TokenStore.loggedInUser.emailAddress,
      (message) => {
        console.log("body", JSON.parse(message.body));
        const content: Message = JSON.parse(message.body) as Message;
        console.log("parsedMessage", content);
        adder(content);
      }
    );
  }

  static getSocketApi(): SocketApi {
    if (this.socketApi) {
      return this.socketApi;
    }
  }

  get getStompClient(): Client {
    return this.stompClient;
  }
}
