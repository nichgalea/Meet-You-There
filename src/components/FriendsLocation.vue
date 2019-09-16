<template>
  <div class="friends-location">
    <p>Next put in your friend's location.</p>
    <Searchfield placeholder="Where's your friend?" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Searchfield from "./Searchfield.vue";

@Component({
  components: {
    Searchfield
  }
})
export default class FriendsLocation extends Vue {}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.friends-location {
  margin-top: 24px;
  font-weight: 500;

  p {
    margin: 0 0 4px;
    padding-left: 8px;
  }

  input {
    @include textfield;
  }
}
</style>