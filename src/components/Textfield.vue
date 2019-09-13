<template>
  <div :class="{ root: true, focus }">
    <input
      type="search"
      autocomplete="off"
      @focus="focus = true"
      @blur="focus = false"
      @input="$emit('input', $event.target.value)"
      :value="value"
    />

    <div v-if="!value" class="placeholder">{{placeholder}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Textfield extends Vue {
  @Prop() value!: string;
  @Prop() placeholder!: string;

  focus = false;
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";
@import "@/styles/colors";

.root {
  position: relative;
  border: 1px solid rgba($primary, 0.3);
  border-radius: 24px;
  margin: 0 auto;
  width: 400px;
  transition-property: box-shadow border;
  transition-duration: 100ms;
  transition-timing-function: ease;

  @include tablet() {
    width: 70%;
  }

  &.focus {
    border: 1px solid rgba($primary, 0.6);
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
  }
}

input {
  border: 0;
  background: none;
  padding: 12px 20px;
  font-size: 14px;
  width: 100%;
  color: $primary;
  font-weight: 500;

  @include small-phone() {
    padding: 12px;
  }
}

.placeholder {
  /*
    this is because I want the placeholder to be in the middle,
    but I don't want the cursor to start at the middle, because
    that looks weird (at least, in my opinion)
  */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.6;
  white-space: nowrap;
}
</style>