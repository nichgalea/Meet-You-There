<template>
  <div class="steps">
    <div class="steps-carousel" :style="{transform: `translate(-${step * (width)}px)`}">
      <div class="step" :style="{ width: `${width}px` }">
        <StepOne @finish="next" />
      </div>

      <div class="step" :style="{ width: `${width}px` }">2</div>

      <div class="step" :style="{ width: `${width}px` }">3</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StepOne from "./StepOne.vue";

@Component({
  components: {
    StepOne
  }
})
export default class Steps extends Vue {
  step = 0;
  width = 0;

  mounted() {
    this.setWidth();
    window.addEventListener("resize", this.setWidth);
  }

  destroyed() {
    window.removeEventListener("resize", this.setWidth);
  }

  setWidth() {
    this.width = this.$el.clientWidth;
  }

  next() {
    if (this.step < 2) {
      this.step++;
    }
  }

  previous() {
    if (this.step >= 0) {
      this.step--;
    }
  }
}
</script>

<style scoped lang="scss">
.steps {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.steps-carousel {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 300ms ease;
  white-space: nowrap;
}

.step {
  display: inline-block;
  box-sizing: border-box;
  white-space: normal;
  padding: 8px;
}
</style>
