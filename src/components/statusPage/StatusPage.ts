import SocketApi from "@/api/SocketApi";
import { formatTime } from "@/helper";
import Message from "@/types/message";
import { BIcon } from "bootstrap-vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    BIcon,
  },
})
export default class StatusPage extends Vue {
  messages: Array<Message> = [];

  mounted() {
    this.getMessages();
  }

  getMessages() {
    SocketApi.getSocketApi().subscribeToMessageStreamAsAdmin((message) =>
      this.messages.push(message)
    );
  }

  formatTime(insertionDateTime: Date): string {
    return formatTime(insertionDateTime);
  }
}
