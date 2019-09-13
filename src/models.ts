/**
 * I generated these using http://www.jsontots.com/ from the response from Foursquare's
 *  `/venues/explore` endpoint, then renamed certain interfaces accordingly.
 */

export namespace Foursquare {
  export interface Recommendation {
    meta: RecommendationResponseMetadata;
    response: RecommendationResponse;
  }

  export interface RecommendationResponse {
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

  export interface Group {
    type: string;
    name: string;
    items: GroupItem[];
  }

  export interface GroupItem {
    reasons: Reasons;
    venue: Venue;
    referralId: string;
    flags?: Flags;
  }

  export interface Flags {
    outsideRadius: boolean;
  }

  export interface Venue {
    id: string;
    name: string;
    location: Location;
    categories: Category[];
    photos: Photos;
    venuePage?: VenuePage;
  }

  export interface VenuePage {
    id: string;
  }

  export interface Photos {
    count: number;
    groups: any[];
  }

  export interface Category {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: Icon;
    primary: boolean;
  }

  export interface Icon {
    prefix: string;
    suffix: string;
  }

  export interface Location {
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

  export interface LabeledLatLng {
    label: string;
    lat: number;
    lng: number;
  }

  export interface Reasons {
    count: number;
    items: Reason[];
  }

  export interface Reason {
    summary: string;
    type: string;
    reasonName: string;
  }

  export interface SuggestedBounds {
    ne: Ne;
    sw: Ne;
  }

  export interface Ne {
    lat: number;
    lng: number;
  }

  export interface SuggestedFilters {
    header: string;
    filters: Filter[];
  }

  export interface Filter {
    name: string;
    key: string;
  }

  export interface RecommendationResponseMetadata {
    code: number;
    requestId: string;
  }
}
