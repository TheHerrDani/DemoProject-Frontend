import MessageApi from "@/api/MessageApi";
import SocketApi from "@/api/SocketApi";
import { formatTime } from "@/helper";
import SelectedChatPartnerStore from "@/store/SelectedChatPartnerStore";
import TokenStore from "@/store/TokenStore";
import Message from "@/types/message";
import User from "@/types/user";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class MessageFeed extends Vue {
  messages: Array<Message> | null = null;
  compnentKey = 0;

  forceUpdated(): void {
    this.compnentKey++;
  }

  get selectedChatPartner(): User {
    return SelectedChatPartnerStore.selectedChatPartner;
  }

  mounted() {
    SocketApi.getSocketApi().subscribeToMessageStreamWithEmail(
      this.addMessages
    );
  }

  @Watch("selectedChatPartner")
  getMessagesOfChatPartner(): void {
    const fromEmail = TokenStore.loggedInUser.emailAddress;
    const toEmail = SelectedChatPartnerStore.selectedChatPartner.emailAddress;
    MessageApi.getMessageApiInstance().getMessages(
      fromEmail,
      toEmail,
      this.setMessages
    );
  }

  setMessages(messages: Array<Message>) {
    this.messages = messages;
    this.forceUpdated();
  }

  addMessages(message: Message) {
    if (this.showAble(message)) {
      this.messages.push(message);
      this.forceUpdated();
    }
  }

  private showAble(message: Message) {
    const fromUserEmail = message.fromUserEmail;
    const toUserEmail = message.toUserEmail;
    return (
      (TokenStore.loggedInUser.emailAddress == fromUserEmail &&
        SelectedChatPartnerStore.selectedChatPartner.emailAddress ==
          toUserEmail) ||
      (TokenStore.loggedInUser.emailAddress == toUserEmail &&
        SelectedChatPartnerStore.selectedChatPartner.emailAddress ==
          fromUserEmail)
    );
  }

  getMessageClass(from: string): { from: boolean; to: boolean } {
    return {
      from: from === TokenStore.loggedInUser.emailAddress,
      to: from !== TokenStore.loggedInUser.emailAddress,
    };
  }

  formatTime(insertionDate: Date): string {
    return formatTime(insertionDate);
  }
}
