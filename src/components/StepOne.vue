<template>
  <div>
    <p>Start by typing where you are, can be a street address, town, city or even a GPS coordinate.</p>

    <p>
      e.g.
      <b>'Vondelpark, Amsterdam'</b> /
      <b>'Valletta, Malta'</b> /
      <b>'52.3578866, 4.8671167'</b>
    </p>

    <p>
      Then just press
      <b>Enter &crarr;</b>
    </p>

    <div class="input-section">
      <form @submit.prevent="submit">
        <Textfield ref="textfield" placeholder="Where are you right now?" v-model="locationName" />
      </form>

      <p class="or">OR</p>

      <div class="btn-container">
        <button
          :disabled="isLoading"
          @click="getCurrentUserLocation"
        >{{ isLoading ? "Checking..." : "Find me!" }}</button>
      </div>

      <div class="btn-container">
        <button ref="continueButton" :disabled="!locationA" @click="$emit('next')">Continue</button>
      </div>

      <p v-if="error" class="error">{{error}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import * as Location from "@/models/location";
import locationService from "@/services/location.service";
import Textfield from "./Textfield.vue";

@Component({
  components: {
    Textfield
  },
  computed: mapState(["locationA"]),
  methods: mapActions(["setLocationA"])
})
export default class StepOne extends Vue {
  @Ref() readonly textfield!: Textfield;
  @Ref() readonly continueButton!: HTMLButtonElement;
  locationName = "";
  error = "";
  isLoading = false;
  setLocationA!: (coords: Location.Coordinates | null) => void;

  async getCurrentUserLocation() {
    try {
      this.error = "";
      this.isLoading = true;

      const coords = await locationService.getCurrentLocationCoordinates();
      this.locationName = await locationService.getLocationNameByCoordinates(
        coords
      );
      this.setLocationA(coords);

      this.continueButton.focus();
      this.continueButton.scrollIntoView({
        behavior: "smooth"
      });
    } catch {
      this.error =
        "Sorry! We couldn't get your location... Are location permissions enabled on this site?";
    } finally {
      this.isLoading = false;
    }
  }

  async submit() {
    try {
      if (this.locationName.trim()) {
        this.error = "";
        this.isLoading = true;

        if (locationService.checkIsCoordinates(this.locationName)) {
          const coords = locationService.convertStrintToCoordinates(
            this.locationName
          );
          this.locationName = await locationService.getLocationNameByCoordinates(
            coords
          );
          this.setLocationA(coords);
        } else {
          const coords = await locationService.getCoordinatesByLocationName(
            this.locationName
          );

          this.setLocationA(coords);
        }

        this.textfield.input.blur();
        this.continueButton.focus();
        this.continueButton.scrollIntoView({
          behavior: "smooth"
        });
      }
    } catch (e) {
      this.setLocationA(null);
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
  @include button();
}

.error {
  font-size: 14px;
  font-weight: 500;
  color: crimson;
}

.or {
  letter-spacing: 2px;
  font-weight: 500;
}
</style>