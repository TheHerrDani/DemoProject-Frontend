import EventBus from "@/EventBus";
import User from "@/types/user";
import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "./store";

@Module({ dynamic: true, namespaced: true, name: "SelectedChatPartnerStore", store })
class SelectedChatPartnerStore extends VuexModule {

  selectedChatPartner: User | null = null ;

  @Action({ commit: "setSelectedChatPartnerMutation", rawError: true })
  public setSelectedChatPartner(selectedChatPartner: User) {
    return selectedChatPartner;
  }

  @Mutation
  public setSelectedChatPartnerMutation(selectedChatPartner: User) {
    this.selectedChatPartner = selectedChatPartner; 
  }  
}
export default getModule(SelectedChatPartnerStore);
