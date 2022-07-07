declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.scss" {
  const content: string;
  export default content;
}
