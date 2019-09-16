import * as turf from "@turf/turf";
import * as Location from "@/models/location";
import * as OpenCage from "@/models/opencage";
import httpService from "./http.service";

export enum LocationServiceError {
  GEO_LOCATION_UNSUPPORTED,
  GEO_LOCATION_TIMEOUT
}
const OPEN_CAGE_URL = "https://api.opencagedata.com/";

export class LocationService {
  async getCurrentLocationCoordinates(): Promise<Location.Coordinates> {
    if (!navigator.geolocation) return Promise.reject(LocationServiceError.GEO_LOCATION_UNSUPPORTED);

    return new Promise<Location.Coordinates>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({ longitude: position.coords.longitude, latitude: position.coords.latitude });
      });

      // if current position unresolved within 5 seconds, reject promise
      setTimeout(() => reject(LocationServiceError.GEO_LOCATION_TIMEOUT), 5000);
    });
  }

  getMidpointCoordinateBetweenTwo(pointA: Location.Coordinates, pointB: Location.Coordinates): Location.Coordinates {
    const turfPointA = turf.point([pointA.longitude, pointA.latitude]);
    const turfPointB = turf.point([pointB.longitude, pointB.latitude]);

    const [longitude, latitude] = turf.center(turf.featureCollection([turfPointA, turfPointB])).geometry!.coordinates;

    return { longitude, latitude };
  }

  async getLocationNameByCoordinates(coord: Location.Coordinates): Promise<OpenCage.Result[]> {
    const url = new URL(`${OPEN_CAGE_URL}/geocode/v1/json`);
    url.searchParams.append("q", `${coord.latitude},${coord.longitude}`);
    url.searchParams.append("key", process.env.VUE_APP_OPEN_CAGE_API_SECRET);
    url.searchParams.append("language", "en");

    return httpService.get<OpenCage.Result[]>(url.toString());
  }

  async getCoordinatesByLocationName(name: string): Promise<OpenCage.Result[]> {
    const url = new URL(`${OPEN_CAGE_URL}/geocode/v1/json`);
    url.searchParams.append("q", name);
    url.searchParams.append("key", process.env.VUE_APP_OPEN_CAGE_API_SECRET);
    url.searchParams.append("language", "en");

    return httpService.get<OpenCage.Result[]>(url.toString());
  }

  checkIsCoordinates(input: string): boolean {
    const commaIndex = input.indexOf(",");

    if (commaIndex === -1) return false;

    const [lon, lat] = input.split(",").map(Number);

    return !isNaN(lon) && !isNaN(lat);
  }

  convertStrintToCoordinates(input: string): Location.Coordinates {
    const [longitude, latitude] = input.split(",").map(Number);
    return { longitude, latitude };
  }
}

export default new LocationService();
