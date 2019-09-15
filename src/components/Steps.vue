<template>
  <div class="steps">
    <div class="steps-carousel" :style="{transform: `translate(-${step * (width)}px)`}">
      <div class="step" :style="{ width: `${width}px` }">
        <StepOne @next="next" />
      </div>

      <div class="step" :style="{ width: `${width}px` }">
        <StepTwo @previous="previous" @next="next" />
      </div>

      <div class="step" :style="{ width: `${width}px` }">
        <StepThree @previous="previous" @reset="reset" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as history from "history";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";

const browserHistory = history.createBrowserHistory();

@Component({
  components: {
    StepOne,
    StepTwo,
    StepThree
  }
})
export default class Steps extends Vue {
  step = 0;
  width = 0;

  handleHistoryChange(location: history.Location) {
    if (typeof location.state === "number") {
      this.step = location.state;
    } else {
      this.step = 0;
    }
  }

  mounted() {
    this.setWidth();
    window.addEventListener("resize", this.setWidth);
    browserHistory.listen(this.handleHistoryChange);
  }

  destroyed() {
    window.removeEventListener("resize", this.setWidth);
  }

  setWidth() {
    this.width = this.$el.clientWidth;
  }

  next() {
    if (this.step < 2) {
      browserHistory.push("", this.step + 1);
    }
  }

  previous() {
    if (this.step >= 0) {
      browserHistory.push("", this.step - 1);
    }
  }

  reset() {
    browserHistory.push("", 0);
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
  vertical-align: top;
  max-height: 85vh;
  overflow: auto;
}
</style>
