import UserApi from "@/api/UserApi";
import SelectedChatPartnerStore from "@/store/SelectedChatPartnerStore";
import User from "@/types/user";
import { Component, Vue, Watch } from "vue-property-decorator";
import ContactUser from "../contactUser/ContactUser.vue";

@Component({
  components: {
    ContactUser,
  },
})
export default class ContactList extends Vue {
  users: Array<User> | null = null;

  selectedUser: User;

  mounted() {
    this.getContactList();
  }

  getContactList() {
    UserApi.getUserApiInstance().findAllUser(this.setContactList);
  }

  setContactList(contactList: Array<User>) {
    console.log(contactList);
    this.users = contactList;
    SelectedChatPartnerStore.setSelectedChatPartner(this.users[0]);
  }
}
