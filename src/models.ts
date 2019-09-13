/**
 * I generated these using http://www.jsontots.com/ from the response from Foursquare's
 *  `/venues/explore` endpoint, then renamed certain interfaces accordingly.
 */

interface Recommendation {
  meta: RecommendationResponseMetadata;
  response: RecommendationResponse;
}

interface RecommendationResponse {
  suggestedFilters: SuggestedFilters;
  suggestedRadius: number;
  headerLocation: string;
  headerFullLocation: string;
  headerLocationGranularity: string;
  query: string;
  totalResults: number;
  suggestedBounds: SuggestedBounds;
  groups: Group[];
}

interface Group {
  type: string;
  name: string;
  items: GroupItem[];
}

interface GroupItem {
  reasons: Reasons;
  venue: Venue;
  referralId: string;
  flags?: Flags;
}

interface Flags {
  outsideRadius: boolean;
}

interface Venue {
  id: string;
  name: string;
  location: Location;
  categories: Category[];
  photos: Photos;
  venuePage?: VenuePage;
}

interface VenuePage {
  id: string;
}

interface Photos {
  count: number;
  groups: any[];
}

interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: Icon;
  primary: boolean;
}

interface Icon {
  prefix: string;
  suffix: string;
}

interface Location {
  address?: string;
  lat: number;
  lng: number;
  labeledLatLngs: LabeledLatLng[];
  distance: number;
  postalCode?: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
  crossStreet?: string;
}

interface LabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

interface Reasons {
  count: number;
  items: Reason[];
}

interface Reason {
  summary: string;
  type: string;
  reasonName: string;
}

interface SuggestedBounds {
  ne: Ne;
  sw: Ne;
}

interface Ne {
  lat: number;
  lng: number;
}

interface SuggestedFilters {
  header: string;
  filters: Filter[];
}

interface Filter {
  name: string;
  key: string;
}

interface RecommendationResponseMetadata {
  code: number;
  requestId: string;
}
