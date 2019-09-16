import * as Foursquare from "@/models/foursquare";
import * as Location from "@/models/location";
import httpService from "@/services/http.service";

const FOURSQUARE_API_URL = "https://api.foursquare.com";

export class VenueService {
  async getSuggestedVenuesByLocation(coords: Location.Coordinates): Promise<Foursquare.Recommendation> {
    const url = new URL(`${FOURSQUARE_API_URL}/v2/venues/explore`);
    url.searchParams.append("client_id", process.env.VUE_APP_FOURSQUARE_ID);
    url.searchParams.append("client_secret", process.env.VUE_APP_FOURSQUARE_SECRET);
    url.searchParams.append("ll", `${coords.latitude},${coords.longitude}`);
    url.searchParams.append("section", "drinks");
    url.searchParams.append("sortByDistance", "1");
    url.searchParams.append("v", "20190913");

    return httpService.get<Foursquare.Recommendation>(url.toString());
  }
}

export default new VenueService();
