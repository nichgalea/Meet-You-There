<template>
  <div class="friends-location">
    <p>Next put in your friend's location.</p>
    <Searchfield placeholder="Where's your friend?" @search="handleSearch" v-model="value" />

    <p v-if="loading" class="loading">Loading...</p>
    <p v-if="error" class="error">{{error}}</p>
    <p v-if="currentLocation" class="current-location">
      Your friend's current location:
      <br />
      <b>{{`${currentLocation.formatted} ${currentLocation.annotations.flag || ""}`}}</b>
    </p>
    <p v-else class="current-location">We don't have their location yet...</p>

    <LocationResults v-if="results" :results="results" @close="handleResultsClose" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import locationService from "@/services/location.service";
import * as OpenCage from "@/models/opencage";
import Searchfield from "./Searchfield.vue";
import LocationResults from "./LocationResults.vue";

@Component({
  components: {
    Searchfield,
    LocationResults
  }
})
export default class FriendsLocation extends Vue {
  currentLocation: OpenCage.Result | null = null;
  results: OpenCage.Result[] | null = null;
  value = "";
  error = "";
  loading = false;

  handleSearch() {
    if (this.value.trim().length === 0) return;
    this.fetchResults(this.value);
  }

  async fetchResults(query: string) {
    this.error = "";
    this.loading = true;

    try {
      const results = await locationService.getLocationResultsByQuery(query);

      switch (results.length) {
        case 0: {
          this.error =
            "We couldn't find any locations for that query. Maybe you need to be a bit more specific?";
          break;
        }

        case 1: {
          this.currentLocation = results[0];
          this.$emit("friend-location", results[0]);
          break;
        }

        default: {
          this.results = results;
          break;
        }
      }
    } catch (e) {
      this.error =
        "Something went wrong when we were trying to pin-point your location!";
    } finally {
      this.loading = false;
    }
  }

  handleResultsClose(selectedLocation?: OpenCage.Result) {
    if (selectedLocation) {
      this.currentLocation = selectedLocation;
      this.$emit("friend-location", selectedLocation);
    }

    this.results = null;
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.friends-location {
  margin-top: 48px;
  font-weight: 500;

  p {
    margin-bottom: 8px;
    padding-left: 8px;
  }

  .loading {
    color: $secondary;
  }

  .error {
    color: red;
  }

  .emphasis {
    font-weight: bolder;
    color: $secondary;
  }

  .current-location > b {
    color: $secondary;
  }
}
</style>