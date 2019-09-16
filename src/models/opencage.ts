export interface LookupResponse {
  documentation: string;
  licenses: License[];
  rate: Rate;
  results: Result[];
  status: Status;
  stay_informed: Stayinformed;
  thanks: string;
  timestamp: Timestamp;
  total_results: number;
}

export interface Timestamp {
  created_http: string;
  created_unix: number;
}

export interface Stayinformed {
  blog: string;
  twitter: string;
}

export interface Status {
  code: number;
  message: string;
}

export interface Result {
  annotations: Annotations;
  bounds: Bounds;
  components: Components;
  confidence: number;
  formatted: string;
  geometry: Northeast;
}

export interface Components {
  "ISO_3166-1_alpha-2": string;
  "ISO_3166-1_alpha-3": string;
  _type: string;
  city: string;
  continent: string;
  country: string;
  country_code: string;
  house_number: string;
  neighbourhood: string;
  political_union: string;
  postcode: string;
  road: string;
  state: string;
  suburb: string;
}

export interface Bounds {
  northeast: Northeast;
  southwest: Northeast;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Annotations {
  FIPS?: FIPS;
  DMS: DMS;
  MGRS: string;
  wikidata?: string;
  Maidenhead: string;
  Mercator: Mercator;
  OSM: OSM;
  UN_M49: UNM49;
  callingcode: number;
  currency: Currency;
  flag: string;
  geohash: string;
  qibla: number;
  roadinfo: Roadinfo;
  sun: Sun;
  timezone: Timezone;
  what3words: What3words;
}

export interface What3words {
  words: string;
}

export interface Timezone {
  name: string;
  now_in_dst: number;
  offset_sec: number;
  offset_string: string;
  short_name: string;
}

export interface Sun {
  rise: Rise;
  set: Rise;
}

export interface Rise {
  apparent: number;
  astronomical: number;
  civil: number;
  nautical: number;
}

export interface Roadinfo {
  drive_on: string;
  road?: string;
  speed_in: string;
}

export interface Currency {
  alternate_symbols: any[];
  decimal_mark: string;
  html_entity: string;
  iso_code: string;
  iso_numeric: string;
  name: string;
  smallest_denomination: number;
  subunit: string;
  subunit_to_unit: number;
  symbol: string;
  symbol_first: number;
  thousands_separator: string;
  disambiguate_symbol?: string;
}

export interface UNM49 {
  regions: Record<string, string>;
  statistical_groupings: string[];
}

export interface OSM {
  edit_url?: string;
  url: string;
}

export interface Mercator {
  x: number;
  y: number;
}

export interface DMS {
  lat: string;
  lng: string;
}

export interface FIPS {
  county: string;
  state: string;
}

export interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}

export interface License {
  name: string;
  url: string;
}
