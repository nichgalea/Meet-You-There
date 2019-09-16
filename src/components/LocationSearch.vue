<template>
  <div class="location-search">
    <MyLocation @result="myCurrentLocation = $event" />
    <FriendsLocation @results="friendCurrentLocation = $event" />

    <button class="submit-button">Show me bars!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as Opencage from "@/models/opencage";
import MyLocation from "./MyLocation.vue";
import FriendsLocation from "./FriendsLocation.vue";

@Component({
  components: { MyLocation, FriendsLocation }
})
export default class LocationSearch extends Vue {
  results: Opencage.Result[] | null = null;
  myCurrentLocation: Opencage.Result | null = null;
  friendCurrentLocation: Opencage.Result | null = null;
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.location-search {
  width: 100%;
  background: $background-light;
  color: $text-primary;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 24px;

  @include tablet(up) {
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }

  @include mobile-large(down) {
    border-radius: 0;
    padding: 8px 8px 24px;
  }

  input {
    @include textfield;
  }

  .submit-button {
    @include button;

    display: block;
    margin-top: 24px;

    @include mobile-large(down) {
      width: 100%;
    }

    @include tablet(up) {
      width: 200px;
      margin-left: auto;
    }
  }
}
</style>