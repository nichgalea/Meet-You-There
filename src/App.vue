<template>
  <div id="app">
    <Header />

    <main>
      <Steps />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Steps from "./components/Steps.vue";

@Component({
  components: {
    Header,
    Steps
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "@/styles/colors";

body {
  margin: 0;
}

main {
  box-sizing: border-box;
  height: 85vh;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary;
}
</style>
