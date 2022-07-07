import { Component, Vue } from "vue-property-decorator";
import ContactList from "../../components/chatComponents/contactList/ContactList.vue";
import NewMessage from "../../components/chatComponents/newMessage/NewMessage.vue";
import MessageFeed from "../../components/chatComponents/messageFeed/MessageFeed.vue";
import ContactUser from "../../components/chatComponents/contactUser/ContactUser.vue"
import User from "@/types/user";
import SelectedChatPartnerStore from "@/store/SelectedChatPartnerStore";

@Component({
  components: {
    MessageFeed,
    ContactList,
    NewMessage,
    ContactUser
  },
})
export default class ChatView extends Vue {

  get selectedChatPartner(): User {
    return SelectedChatPartnerStore.selectedChatPartner;
  }
  
}