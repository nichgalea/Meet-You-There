<template>
  <main>
    <div class="info-section">
      <header>
        <h1>MeetYouThere!</h1>

        <p>Find places for drinks between you and your friend's location!</p>

        <p>Search by address, landmark or even GPS coordinates!</p>

        <NativeShare v-if="hasNativeShare" />
      </header>
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

  h1 {
    color: $primary;
  }

  @include desktop {
    padding-left: 16px;
    padding-right: 16px;
  }

  @include tablet {
    padding-left: 16px;
    padding-right: 16px;
  }

  @include mobile-large {
    padding: 0;
    flex-flow: column nowrap;
  }

  @include mobile-large {
    padding: 0;
  }

  h1 {
    margin: 0;
    text-align: left;

    @include mobile-large {
      margin: 15px 0;
      text-align: center;
    }
  }

  p {
    font-size: 18px;

    @include mobile-large {
      text-align: center;
    }
  }

  .info-section {
    width: 100%;
    box-sizing: border-box;

    @include mobile-large {
      &:first-child {
        padding: 0 8px;
      }
    }
  }
}
</style>