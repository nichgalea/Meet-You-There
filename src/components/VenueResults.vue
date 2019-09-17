<template>
  <div class="venue-results">
    <h2>Results</h2>

    <p>
      Midpoint between both locations:
      <span class="midpoint">
        <a
          :href="`https://www.google.com/maps/search/?api=1&query=${midpoint.latitude},${midpoint.longitude}`"
          target="_blank"
        >{{midpoint.longitude}}, {{midpoint.latitude}}</a>
      </span>
      <br />
      <br />
      Showing {{recommendations.length}} result{{recommendations.length === 1 ? "" : "s"}} found within a {{radius | distance}} radius of the midpoint. This radius is automatically chosen by the Foursquare API based on density of venues in the area.
    </p>

    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th v-if="nativeShare">Share</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item of recommendations" :key="item.venue.id">
            <td>
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${item.venue.location.lat},${item.venue.location.lng}`"
                target="_blank"
              >{{item.venue.name}}</a>
            </td>
            <td>{{item.venue.location.formattedAddress.join(", ")}}</td>
            <td v-if="nativeShare">
              <NativeShare
                title="MeetYouThere!"
                :text="`Hey! I found this place, '${item.venue.name}' from  ${siteUrl}. It looks like a nice halfway-place for us to meet!`"
                :url="`https://www.google.com/maps/search/?api=1&query=${item.venue.location.lat},${item.venue.location.lng}`"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as Foursquare from "@/models/foursquare";
import * as Location from "@/models/location";
import distance from "@/filters/distance";
import NativeShare from "./NativeShare.vue";

@Component({
  filters: {
    distance
  },
  components: {
    NativeShare
  }
})
export default class VenueResults extends Vue {
  @Prop() midpoint!: Location.Coordinates;
  @Prop() recommendations!: Foursquare.GroupItem[];
  @Prop(Number) radius!: number;
  nativeShare = Boolean(navigator.share);
  siteUrl = window.location.href;
}
</script>

<style scoped lang="scss">
@import "@/styles/mixins";

h2 {
  margin-top: 0;
}

p {
  font-weight: 500;
}

.table-section {
  @include tablet(up) {
    max-height: 60vh;
  }
  overflow: auto;
}

table {
  border-collapse: collapse;
}

tr {
  cursor: pointer;

  &:nth-child(odd) {
    td {
      background: white;
    }
  }
}

td {
  padding: 8px;
}

th {
  padding: 8px;
  text-align: left;
  color: $secondary;
  font-weight: bolder;
}

.midpoint {
  color: $secondary;
  font-weight: bolder;
}
</style>