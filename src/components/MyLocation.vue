<template>
  <div class="my-location">
    <p>
      Start by first putting in your current location. You can click the
      <span
        class="emphasis"
      >Find Me!</span> button to find it automatically.
    </p>

    <div class="input-section">
      <Searchfield placeholder="Where are your right now?" />
    </div>

    <button class="find-me">Find Me!</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Searchfield from "./Searchfield.vue";

@Component({ components: { Searchfield } })
export default class MyLocation extends Vue {
  autoUsed = false;

  handleSearch(value: string) {
    console.log(value);
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.my-location {
  font-weight: 500;

  p {
    margin-bottom: 4px;
    padding-left: 8px;
  }
}

.emphasis {
  font-weight: bolder;
  color: $secondary;
}

.find-me {
  @include button($secondary, white);

  display: block;
  margin: 8px 0 0 auto;

  @include mobile-large(down) {
    width: 100%;
  }

  @include tablet(up) {
    width: 200px;
  }
}
</style>