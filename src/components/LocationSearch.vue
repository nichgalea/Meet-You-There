<template>
  <div class="location-search">
    <template v-if="!recommendations">
      <MyLocation @my-location="myLocation = $event" />
      <FriendsLocation @friend-location="friendLocation = $event" />

      <p v-if="loading" class="loading">Loading...</p>
      <p v-if="error" class="error">{{error}}</p>

      <button :disabled="isSubmitDisabled" class="submit-button" @click="searchVenues">Show me bars!</button>
    </template>

    <VenueResults
      v-else
      :recommendations="recommendations"
      @reset="recommendations = null"
      :midpoint="midpoint"
      :radius="radius"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import venueService from "@/services/venue.service";
import locationService from "@/services/location.service";
import * as OpenCage from "@/models/opencage";
import * as Foursquare from "@/models/foursquare";
import * as Location from "@/models/location";
import MyLocation from "./MyLocation.vue";
import FriendsLocation from "./FriendsLocation.vue";
import VenueResults from "./VenueResults.vue";

@Component({
  components: { MyLocation, FriendsLocation, VenueResults }
})
export default class LocationSearch extends Vue {
  myLocation: OpenCage.Result | null = null;
  friendLocation: OpenCage.Result | null = null;
  midpoint: Location.Coordinates | null = null;
  radius: number | null = null;
  loading = false;
  error = "";
  recommendations: Foursquare.GroupItem[] | null = null;

  get isSubmitDisabled(): boolean {
    return Boolean(!this.myLocation || !this.friendLocation);
  }

  async searchVenues() {
    this.error = "";
    this.loading = true;

    try {
      this.midpoint = locationService.getMidpointCoordinateBetweenTwo(
        {
          longitude: this.myLocation!.geometry.lng,
          latitude: this.myLocation!.geometry.lat
        },
        {
          longitude: this.friendLocation!.geometry.lng,
          latitude: this.friendLocation!.geometry.lat
        }
      );

      const data = await venueService.getSuggestedVenuesByLocation(
        this.midpoint
      );

      this.radius = data.response.suggestedRadius;
      this.recommendations = data.response.groups[0].items;
    } catch (e) {
      this.error = "Something went wrong when trying to find venues! Sorry!";
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.location-search {
  width: 100%;
  background: $background;
  color: $text-primary;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 24px;
  font-weight: 500;

  @include tablet(up) {
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }

  @include mobile-large(down) {
    border-radius: 0;
    padding: 8px 8px 24px;
  }

  .submit-button {
    @include button;

    display: block;
    margin-top: 24px;

    @include mobile-large(down) {
      width: 100%;
    }

    @include tablet(up) {
      width: 200px;
      margin-left: auto;
    }
  }
}

.loading {
  color: $secondary;
}

.error {
  color: red;
}

p {
  margin-bottom: 4px;
  padding-left: 8px;
}
</style>