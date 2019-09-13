import * as Foursquare from "@/models/foursquare";

const FOURSQUARE_API_URL = "https://api.foursquare.com";

export enum VENUE_SERVICE_ERROR {
  GEO_LOCATION_UNSUPPORTED,
  GEO_LOCATION_TIMEOUT
}

export class VenueService {
  async getCurrentLocation(): Promise<string> {
    if (!navigator.geolocation) return Promise.reject(VENUE_SERVICE_ERROR.GEO_LOCATION_UNSUPPORTED);

    return new Promise<string>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position =>
        resolve(`${position.coords.latitude},${position.coords.longitude}`)
      );

      // if current position unresolved within 5 seconds, reject promise
      setTimeout(() => reject(VENUE_SERVICE_ERROR.GEO_LOCATION_TIMEOUT), 5000);
    });
  }

  async getSuggestedVenuesByLocation(location: string): Promise<Foursquare.Recommendation> {
    const isCoord = this.isLocationCoordinates(location);

    const url = new URL(`${FOURSQUARE_API_URL}/v2/venues/explore`);
    url.searchParams.append("client_id", process.env.VUE_APP_FOURSQUARE_ID);
    url.searchParams.append("client_secret", process.env.VUE_APP_FOURSQUARE_SECRET);
    url.searchParams.append(isCoord ? "ll" : "near", location);
    url.searchParams.append("query", "bars,cafes");
    url.searchParams.append("sortByDistance", "1");
    url.searchParams.append("radius", "100000");
    url.searchParams.append("v", "20190913");

    const response = await fetch(url.toString());

    if (response.ok) {
      return await response.json();
    }

    const error = await response.json();

    throw error;
  }

  private isLocationCoordinates(location: string): boolean {
    const commaIndex = location.indexOf(",");

    if (commaIndex === -1) return false;

    const [lon, lat] = location.split(",");

    return !isNaN(Number(lon)) && !isNaN(Number(lat));
  }
}

export default new VenueService();
