<template>
  <div class="search-field">
    <input
      :placeholder="placeholder"
      type="search"
      @input="$emit('input', $event.target.value)"
      :value="value"
    />

    <button class="search-button" @click="$emit('search', value)">
      <svg viewBox="0 0 56.966 56.966">
        <path
          d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Searchfield extends Vue {
  @Prop({ type: String, default: "" }) placeholder!: string;
  @Prop(String) value!: string;
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.search-field {
  position: relative;

  input {
    @include textfield;
    width: 100%;
  }

  button {
    @include button($flat: true);
    width: 42px;
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;

    svg {
      fill: white;
    }
  }
}
</style>