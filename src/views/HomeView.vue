<template>
  <div class="home">
    <LoginPage></LoginPage>
  </div>
</template>

<script lang="ts">
import LoginPage from "../components/loginPage/LoginPage.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    LoginPage,
  },
})
export default class HomeView extends Vue {}
</script>
