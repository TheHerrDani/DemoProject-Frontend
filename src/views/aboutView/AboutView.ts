import { Component, Vue } from "vue-property-decorator";
import StatusPage from "@/components/statusPage/StatusPage.vue";
import AppVersion from "../../components/AppVersion.vue";

@Component({
  components: {
    StatusPage,
    AppVersion,
  },
})
export default class AboutView extends Vue {}