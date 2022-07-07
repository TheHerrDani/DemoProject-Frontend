import { Component, Prop, Vue } from "vue-property-decorator";
import User from "@/types/user";
import SelectedChatPartnerStore from "@/store/SelectedChatPartnerStore";

@Component({
  components: {},
})
export default class ContactUser extends Vue {
 
  @Prop({required: true})
  user!: User;

  get userInitial(): string {
    return this.user.emailAddress[0].toLocaleUpperCase();
  }

  get selectedChatPartner(): User {
    return SelectedChatPartnerStore.selectedChatPartner;
  }

  isThisSelectedUser(user: User): boolean {
    return this.selectedChatPartner?.id === user.id;
  }

  primaryColors = ['7', '8', '9', 'a', 'b', 'c', 'd'];
  secondaryColors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  get generateBgColor(): string {
    const randomPrimaryColor1 = this.primaryColors[Math.floor(Math.random()*7)];
    const randomSecondaryColor1 = this.secondaryColors[Math.floor(Math.random()*16)];

    const randomPrimaryColor2 = this.primaryColors[Math.floor(Math.random()*7)];
    const randomSecondaryColor2 = this.secondaryColors[Math.floor(Math.random()*16)];

    const randomPrimaryColor3 = this.primaryColors[Math.floor(Math.random()*7)];
    const randomSecondaryColor3 = this.secondaryColors[Math.floor(Math.random()*16)];
    
    return '#' + randomPrimaryColor1 + randomSecondaryColor1 + randomPrimaryColor2 + randomSecondaryColor2 + randomPrimaryColor3 + randomSecondaryColor3;
  }
  
  selectUser(): void {
    SelectedChatPartnerStore.setSelectedChatPartner(this.user);
  }
}