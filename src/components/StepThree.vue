<template>
  <div class="step-3">
    <p class="error">{{error}}</p>

    <template v-if="results.length > 0">
      <table>
        <thead>
          <tr>
            <th>Venue</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="venue of results" :key="venue.id">
            <td>{{venue.name}}</td>
            <td>
              <a
                :href="getGoogleMapsLink(venue)"
                target="_blank"
              >{{venue.location.formattedAddress[0]}}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <div>
      <button @click="$emit('previous')">Previous</button>
    </div>

    <div>
      <button @click="$emit('reset')">Start over</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import throttle from "lodash/throttle";
import * as Location from "@/models/location";
import * as Foursquare from "@/models/foursquare";
import locationService from "@/services/location.service";
import venueService from "@/services/venue.service";
import distance from "@/filters/distance";

@Component({
  filters: { distance },
  computed: mapState(["locationA", "locationB"])
})
export default class StepThree extends Vue {
  locationA!: Location.Coordinates | null;
  locationB!: Location.Coordinates | null;
  results: Foursquare.Venue[] = [];
  error = "";
  debouncedComputeVenues!: () => void;

  created() {
    this.debouncedComputeVenues = throttle(this.computeVenues, 1000);
  }

  @Watch("locationA")
  @Watch("locationB")
  handleLocationUpdate() {
    if (this.locationA && this.locationB) {
      this.debouncedComputeVenues();
    } else {
      this.results = [];
    }
  }

  async computeVenues() {
    try {
      this.error = "";

      const midpointLocation = locationService.getMidpointCoordinateBetweenTwo(
        this.locationA!,
        this.locationB!
      );

      const result = await venueService.getSuggestedVenuesByLocation(
        midpointLocation
      );

      this.results = result.response.groups[0].items.map(i => i.venue);

      if (this.results.length === 0) {
        this.error =
          "Sorry, we couldn't find anything with the given locations! Is the distance maybe too large? We won't find venues over large areas of sea or ocean! :/";
      }
    } catch (e) {
      this.error =
        "Oops! Something went wrong when trying to fetch your results!";
    }
  }

  getGoogleMapsLink(venue: Foursquare.Venue) {
    const url = new URL("https://www.google.com/maps/dir/?api=1");

    url.searchParams.append(
      "origin",
      `${this.locationA!.latitude},${this.locationA!.longitude}`
    );
    url.searchParams.append(
      "destination",
      `${venue.location.lat}, ${venue.location.lng}`
    );

    return url.toString();
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";

.step-3 {
  width: 100%;
  height: 100%;
  overflow: auto;
}

button {
  @include button();

  margin-top: 16px;

  &:last-of-type {
    margin-bottom: 8px;
  }
}

.error {
  font-size: 14px;
  font-weight: 500;
  color: crimson;
}

table {
  margin: 0 auto;
}

th,
td {
  &:first-child {
    text-align: right;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:nth-child(2) {
    padding-left: 10px;
    text-align: left;
  }

  &:nth-child(3),
  &:nth-child(4) {
    padding-right: 10px;
    text-align: right;
  }
}
</style>