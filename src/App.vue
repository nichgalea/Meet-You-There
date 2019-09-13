<template>
  <div id="app">
    <h1>MeetYouThere!</h1>

    <p>Find cafés and bars that are close to you and your friend!</p>

    <Search />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "./components/Search.vue";

@Component({
  components: {
    Search
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
