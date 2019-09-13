<template>
  <header>
    <h1>MeetYouThere!</h1>
  </header>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";

header {
  height: 15vh;
  box-sizing: border-box;
  position: relative;

  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;

    @include large-phone() {
      font-size: 1.5rem;
    }
  }

  p {
    margin: 4px 0;
    padding: 0 4px;

    @include large-phone() {
      font-size: 1rem;
    }
  }
}
</style>