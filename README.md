# MeetYouThere

A VueJS project in TypeScript.

Given two locations (one can be found using the browser geolocation API), this will find a bars mid-way between said locations.

The application is fully responsive and supports all last 2 versions of major browsers. I recommend using it on mobile in order to also see the use of the `navigator.share` ([info here](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)) browser API.

The locations are geo-coded through [OpenCage Geocoder](https://opencagedata.com/), the mid-point between the two coordinates is then found using [TurfJS](https://github.com/Turfjs/turf) (the calculation is linear and does not account for water or other impossible geographic terrain), and a list of suggested venues close to the calculated mid-point coordinate is found using [Foursquare's Places API](https://developer.foursquare.com/places-api). The Foursquare API will automatically calculate the radius within which it suggests venues **based on the density of available venues in that area.** [More info on this here.](https://developer.foursquare.com/docs/api/venues/search)

## Finding the midpoint between two geographical coordinates

Initially I found this solution:

> https://stackoverflow.com/questions/4656802/midpoint-between-two-latitude-and-longitude

However, the math isn't that straightforward, even though I can still convert it to JS.

With a bit of effort I managed to find this library: https://github.com/Turfjs/turf. Which seems to have decent support and relatively recent activity. Through its documentation it seems quite straightforward to use, at least for my needs for sure.

## Environment Variables

This requires 3 environment variables to be able to work:

- `VUE_APP_FOURSQUARE_ID` - Foursquare's API Client ID
- `VUE_APP_FOURSQUARE_SECRET` - Foursquare's API Client Secret
- `VUE_APP_OPEN_CAGE_API_SECRET` - OpenCage's API Secret

These can be injected in the app through an `.env` or `.env.local` file. There is an `.env.sample` in the project that can be renamed and the values can be changed there.

It is important that the variables start with the prefix `VUE_APP_`, otherwise they won't be picked up by the build and injected into the app through Webpack's `DefinePlugin` feature. [More info about this here.](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
