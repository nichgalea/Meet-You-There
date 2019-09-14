import * as Foursquare from "@/models/foursquare";
import * as Location from "@/models/location";

const FOURSQUARE_API_URL = "https://api.foursquare.com";

export class VenueService {
  async getSuggestedVenuesByLocation(coords: Location.Coordinates): Promise<Foursquare.Recommendation> {
    const url = new URL(`${FOURSQUARE_API_URL}/v2/venues/explore`);
    url.searchParams.append("client_id", process.env.VUE_APP_FOURSQUARE_ID);
    url.searchParams.append("client_secret", process.env.VUE_APP_FOURSQUARE_SECRET);
    url.searchParams.append("ll", `${coords.latitude},${coords.longitude}`);
    url.searchParams.append("section", "drinks,coffee");
    url.searchParams.append("sortByDistance", "1");
    url.searchParams.append("v", "20190913");

    const response = await fetch(url.toString());

    if (response.ok) {
      return await response.json();
    }

    throw await response.json();
  }
}

export default new VenueService();
