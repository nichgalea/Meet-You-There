<template>
  <div id="app">
    <Main />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Main from "./components/Main.vue";

@Component({
  components: {
    Main
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "@/styles/colors";

* {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
}

a {
  color: $secondary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $text-primary;
}
</style>
