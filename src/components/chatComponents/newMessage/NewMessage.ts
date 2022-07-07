import SocketApi from "@/api/SocketApi";
import SelectedChatPartnerStore from "@/store/SelectedChatPartnerStore";
import TokenStore from "@/store/TokenStore";
import Message from "@/types/message";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class NewMessage extends Vue {
  newMessage = "";

  get isMessageSendAble(): boolean {
    console.log(this.newMessage.length);
    return this.newMessage.length > 0;
  }

  sendMessage() {
    const sendMessage = new Message();
    sendMessage.fromUserEmail = TokenStore.loggedInUser.emailAddress;
    sendMessage.toUserEmail =
      SelectedChatPartnerStore.selectedChatPartner.emailAddress;
    sendMessage.message = this.newMessage;
    sendMessage.insertionDateTime = new Date();
    const stompClient = SocketApi.getSocketApi().getStompClient;
    if (stompClient && stompClient.connected) {
      stompClient.send("/app/send-message", JSON.stringify(sendMessage), {});
    }
    this.newMessage = "";
  }
}
