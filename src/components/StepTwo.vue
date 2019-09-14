<template>
  <div>
    <p>Next, just put in where your friend is right now.</p>
    <p>
      Then just press
      <b>Enter &crarr;</b>
    </p>

    <p>Same as before: cities, towns, addresses, GPS locations are accepted.</p>

    <div class="input-section">
      <form @submit.prevent="submit">
        <Textfield
          ref="textfield"
          v-model="locationName"
          placeholder="Where's your friend right now?"
        />
      </form>
    </div>

    <div class="btn-container">
      <button class="btn-previous" @click="$emit('previous')">Back to my location</button>
    </div>

    <div class="btn-container">
      <button
        ref="continueButton"
        class="btn-next"
        :disabled="!locationB"
        @click="$emit('next')"
      >{{isLoading ? "Loading" : "Show me venues!" }}</button>
    </div>

    <p v-if="error" class="error">{{error}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";
import locationService from "@/services/location.service";
import * as Location from "@/models/location";
import Textfield from "./Textfield.vue";

@Component({
  components: {
    Textfield
  },
  computed: mapState(["locationB"]),
  methods: mapActions(["setLocationB"])
})
export default class StepTwo extends Vue {
  @Ref() readonly textfield!: Textfield;
  @Ref() readonly continueButton!: HTMLButtonElement;
  locationName = "";
  isLoading = false;
  error = "";
  setLocationB!: (coords: Location.Coordinates | null) => void;

  async submit() {
    try {
      if (this.locationName.trim()) {
        this.error = "";
        this.isLoading = true;

        if (locationService.checkIsCoordinates(this.locationName)) {
          const coords = locationService.convertStrintToCoordinates(
            this.locationName
          );
          this.setLocationB(coords);
        } else {
          const coords = await locationService.getCoordinatesByLocationName(
            this.locationName
          );

          this.setLocationB(coords);
        }

        this.textfield.input.blur();
        this.continueButton.focus();
        this.continueButton.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      this.setLocationB(null);
      this.error = `Sorry! We couldn't find any location with the query '${this.locationName.trim()}'!`;
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";

.input-section {
  margin-top: 16px;
}

.btn-container {
  margin-top: 16px;
}

button {
  &.btn-next {
    @include button();
  }

  &.btn-previous {
    @include button($outline: true);
  }
}

.error {
  font-size: 14px;
  font-weight: 500;
  color: crimson;
}
</style>