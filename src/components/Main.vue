<template>
  <main>
    <div class="info-section">
      <h1>MeetYouThere!</h1>

      <p>Find places for drinks between you and your friend's location!</p>

      <p>Search by address, landmark or even GPS coordinates.</p>

      <p v-if="hasNativeShare">
        <NativeShare
          title="MeetYouThere!"
          text="Hey! Let's meet halfway using this!"
          label="Click to share with your friends!"
          :url="siteUrl"
        />
      </p>
    </div>

    <LocationSearch />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LocationSearch from "./LocationSearch.vue";
import NativeShare from "./NativeShare.vue";

@Component({
  components: {
    LocationSearch,
    NativeShare
  }
})
export default class Main extends Vue {
  hasNativeShare = Boolean(navigator.share);
  siteUrl = window.location.href;
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";
@import "@/styles/colors";

main {
  width: 100%;
  max-width: 1024px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  padding: 60px 0;

  @include desktop {
    padding-left: 16px;
    padding-right: 16px;
  }

  @include tablet {
    padding-left: 16px;
    padding-right: 16px;
  }

  @include mobile-large(down) {
    padding: 0;
    flex-flow: column nowrap;
  }

  h1 {
    margin: 0;
    text-align: left;
    color: $primary;

    @include mobile-large(down) {
      margin: 15px 0;
      text-align: center;
    }
  }

  p {
    font-size: 18px;

    @include mobile-large(down) {
      text-align: center;
    }
  }

  .info-section {
    box-sizing: border-box;
    padding: 8px;

    @include mobile-large(down) {
      &:first-child {
        padding: 0 8px;
      }
    }
  }
}
</style>