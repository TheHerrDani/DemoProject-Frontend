<template>
  <div class="b-container-fluid version">
    <div>
      Version:<span v-if="version">{{ version }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import VersionApi from "@/api/VersionApi";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class AppVersion extends Vue {
  version = "";

  mounted() {
    this.findVersion();
  }
  findVersion() {
    VersionApi.getVersionApiInstance().findVersion(this.setVersion);
  }
  setVersion(version: string) {
    this.version = version;
  }
}
</script>
<style lang="css" scoped>
.version {
  background-color: #2c3e50;
  color: #ccc;
  padding: 14px;
}
</style>
