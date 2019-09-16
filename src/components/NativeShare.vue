<template>
  <div @click="handleShare" class="native-share">
    <button class="share-button" title="Click to share!">
      <svg width="24" height="24">
        <path
          d="M5 7a5 5 0 1 1-.001 10.001A5 5 0 0 1 5 7zm11.122 12.065A3.946 3.946 0 0 0 16 20a4 4 0 1 0 4-4 3.974 3.974 0 0 0-2.935 1.301l-5.488-2.927a6.973 6.973 0 0 1-.943 1.764l5.488 2.927zM24 4a4 4 0 0 0-8 0c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927A3.974 3.974 0 0 0 20 8a4 4 0 0 0 4-4z"
        />
      </svg>
    </button>
    <span>Click to share with friends!</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NativeShare extends Vue {
  handleShare() {
    if (navigator.share) {
      // leverage native share on phones!
      // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
      navigator.share({
        title: "MeetYouThere!",
        text: "Hey! Let's meet halfway using this!",
        url: window.location.href
      });
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/colors";

.native-share {
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;

  svg {
    fill: $primary;
  }
}

.share-button {
  appearance: none;
  height: 30px;
  width: 30px;
  padding: 0;
  border: 0;
  margin-right: 8px;
}
</style>