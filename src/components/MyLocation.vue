<template>
  <div class="my-location">
    <p>
      Start by first putting in your current location, then
      <span
        class="emphasis"
      >press the search button or hit Enter &crarr; to search</span>.
    </p>

    <p>
      You can click the
      <span class="emphasis">Find Me!</span> button to find it automatically (you don't need hit search otherwise).
    </p>

    <div class="input-section">
      <Searchfield placeholder="Where are you right now?" @search="handleSearch" v-model="value" />
    </div>

    <p v-if="loading" class="loading">Loading...</p>

    <p v-if="error" class="error">{{error}}</p>

    <p v-if="currentLocation" class="current-location">
      Your current location:
      <br />
      <b>{{`${currentLocation.formatted} ${currentLocation.annotations.flag || ""}`}}</b>
    </p>
    <p v-else class="current-location">We don't have your location yet...</p>

    <button class="find-me" @click="findCurrentCoordinates">Find Me!</button>

    <LocationResults v-if="results" :results="results" @close="handleResultsClose" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import locationService from "@/services/location.service";
import * as OpenCage from "@/models/opencage";
import Searchfield from "./Searchfield.vue";
import LocationResults from "./LocationResults.vue";

@Component({ components: { Searchfield, LocationResults } })
export default class MyLocation extends Vue {
  currentLocation: OpenCage.Result | null = null;
  results: OpenCage.Result[] | null = null;
  value = "";
  error = "";
  loading = false;

  handleSearch() {
    if (this.value.trim().length === 0) return;
    this.fetchResults(this.value);
  }

  async findCurrentCoordinates() {
    this.loading = true;

    try {
      const coords = await locationService.getCurrentLocationCoordinates();
      this.fetchResults(`${coords.latitude}, ${coords.longitude}`);
    } catch {
      this.error =
        "Couldn't get your location! Are location permissions enabled on this site?";
    } finally {
      this.loading = false;
    }
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
          this.$emit("my-location", results[0]);
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
      this.$emit("my-location", selectedLocation);
    }

    this.results = null;
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/colors";
@import "@/styles/mixins";

.my-location {
  font-weight: 500;

  p {
    margin-bottom: 8px;
    padding-left: 8px;
  }
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

.find-me {
  @include button($secondary, white);

  display: block;
  margin: 8px 0 0 auto;

  @include mobile-large(down) {
    width: 100%;
  }

  @include tablet(up) {
    width: 200px;
  }
}
</style>