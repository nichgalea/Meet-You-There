<template>
  <div>
    <p>
      Next, put in where your friend is right now, e.g.
      <span class="example">'Utrecht'</span> or
      <span class="example">'52.0842715,5.0124519'</span>
    </p>

    <p>
      Then hit
      <b>Enter &crarr;</b>
    </p>

    <div class="input-section">
      <form @submit.prevent="submit">
        <Textfield v-model="location" placeholder="Where is your friend?" />
      </form>

      <button @click="$emit('previous')">Back to my location</button>

      <p v-if="status">{{status}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mapActions } from "vuex";
import venueService from "@/services/venue.service";
import * as Foursquare from "@/models/foursquare";
import Textfield from "./Textfield.vue";

@Component({
  components: { Textfield },
  methods: {
    ...mapActions(["setVenuesB"])
  }
})
export default class StepTwo extends Vue {
  location = "";
  loading = "";
  status = "";
  setVenuesB!: (venues: Foursquare.Venue[]) => void;

  async submit() {
    const trimmedLocation = this.location.trim();

    if (trimmedLocation.length > 0) {
      try {
        this.status = "Checking...";
        const venues = await this.getVenues(trimmedLocation);
        this.status = "Got it!";
        this.setVenuesB(venues);
        this.$emit("next");
        setTimeout(() => (this.status = ""), 600);
      } catch (e) {
        const isFailedGeoCode =
          (e as Foursquare.Error).meta.errorType === "failed_geocode";

        this.status = isFailedGeoCode
          ? `Couldn't find specific location with the query "${trimmedLocation}"`
          : "Sorry, something went wrong while trying to request the venues!";
      } finally {
        this.loading = "";
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
@import "@/styles/colors";
@import "@/styles/mixins";

.example {
  font-weight: bold;
}

button {
  margin-top: 16px;
  @include button($outline: true);
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
