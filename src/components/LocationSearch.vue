<template>
  <div class="location-search">
    <div class="step-one">
      <p>Start by first putting in your current location.</p>

      <div class="input-section">
        <input type="search" placeholder="Where are you right now?" />
        <button>Find Me!</button>
      </div>
    </div>

    <p>Next put in your friend's location.</p>
    <input type="search" placeholder="Where's your friend?" />

    <button>Show me bars!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LocationSearch extends Vue {}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.location-search {
  width: 100%;
  background: $background-light;
  color: $text-primary;
  padding: 16px;
  box-sizing: border-box;

  p {
    margin: 0 0 8px 0;
    padding-left: 12px;
    font-weight: 500;

    &:nth-of-type(2) {
      margin-top: 24px;
    }
  }

  input {
    appearance: none;
    border: 0;
    border-radius: 10px;
    padding: 12px;
    font-size: 16px;
    width: 100%;
    transition: box-shadow 100ms ease;

    &:focus {
      border: 1px solid $text-primary;
      box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.3);
    }
  }

  button {
    @include button;

    display: block;
    margin-top: 24px;

    @include mobile-large {
      width: 100%;
    }

    @include mobile {
      width: 100%;
    }
  }

  .step-one {
    display: flex;
    flex-flow: column nowrap;

    .input-section {
      display: flex;
      flex-flow: row nowrap;

      input {
        flex: 0 0 80%;
      }
    }
  }
}
</style>