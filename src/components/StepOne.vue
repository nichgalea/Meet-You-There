<template>
  <div>
    <p>Find cafés and bars that are close to you and your friend!</p>

    <p>
      Start by putting in your location, like the name of a city, town or even a GPS coordinate (e.g.
      <span
        class="example"
      >'Amsterdam'</span> or
      <span class="example">'52.3790203,4.8984654'</span>).
    </p>

    <p>
      Then hit
      <b>Enter &crarr;</b>
    </p>

    <div class="input-section">
      <form @submit.prevent="submit">
        <Textfield v-model="location" placeholder="Where are you right now?" />
      </form>

      <p class="or">OR</p>

      <button :disabled="isButtonDisabled" @click="findLocation">{{buttonText}}</button>

      <template v-if="findLocationFailed">
        <p class="error">Sorry, we really tried to get your location, but couldn't!</p>
        <p class="error">Are location permissions allowed on this site?</p>
      </template>

      <template v-if="requestError">
        <p class="error">{{requestError}}</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions } from "vuex";
import venueService, { VENUE_SERVICE_ERROR } from "@/services/venue.service";
import * as Foursquare from "@/models/foursquare";
import Textfield from "./Textfield.vue";

@Component({
  components: {
    Textfield
  },
  methods: {
    ...mapActions(["setVenuesA"])
  }
})
export default class StepOne extends Vue {
  location = "";
  findLocationFailed = false;
  requestError = "";
  loading = "";
  success = "";
  buttonDefaultText = "Find my location automatically!";

  setVenuesA!: (venues: Foursquare.Venue[]) => void;

  get buttonText(): string {
    if (this.success) return this.success;

    if (this.loading) return this.loading;

    return this.buttonDefaultText;
  }

  get isButtonDisabled(): boolean {
    return Boolean(this.loading || this.success) || false;
  }

  async findLocation() {
    try {
      this.loading = "Trying to find where you are...";

      this.location = await venueService.getCurrentLocation();

      this.findLocationFailed = false;

      this.submit();
    } catch (error) {
      this.findLocationFailed = true;

      console.error(`ERR :: ${VENUE_SERVICE_ERROR[error]}`);
    } finally {
      this.loading = "";
    }
  }

  async submit() {
    const trimmedLocation = this.location.trim();

    if (trimmedLocation.length > 0) {
      try {
        if (!this.loading) {
          this.loading = "Checking...";
        }

        const venues = await this.getVenues(trimmedLocation);
        this.success = "We got it!";
        this.setVenuesA(venues);
        this.findLocationFailed = false;
        this.loading = this.requestError = "";

        setTimeout(() => {
          this.$emit("finish");

          // don't clear success message until the slide has moved
          setTimeout(() => (this.success = ""), 600);
        }, 500); // just enough time to notice the success status
      } catch (e) {
        this.loading = "";

        const isFailedGeoCode =
          (e as Foursquare.Error).meta.errorType === "failed_geocode";

        this.requestError = isFailedGeoCode
          ? `Couldn't find specific location with the query "${trimmedLocation}"`
          : "Sorry, something went wrong while trying to request the venues!";
      }
    }
  }

  async getVenues(location: string): Promise<Foursquare.Venue[]> {
    const result = await venueService.getSuggestedVenuesByLocation(location);
    return result.response.groups[0].items.map(i => i.venue);
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";
@import "@/styles/colors";

.example {
  font-weight: bold;
}

.input-section {
  margin-top: 40px;
}

button {
  @include button();
}

p {
  &:first-child {
    margin-top: 0;
  }

  &.error {
    font-size: 14px;
    color: crimson;
  }

  &.or {
    letter-spacing: 2px;
    font-weight: 500;
  }
}
</style>