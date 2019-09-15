# MeetYouThere

A VueJS project in TypeScript.

Given two locations (one can be found using the browser geolocation API), this will find a bar / cafe mid-way between said locations.

The locations are geo-coded through [OpenCage Geocoder](https://opencagedata.com/), the mid-point between the two coordinates is then found using [TurfJS](https://github.com/Turfjs/turf) (the calculation is linear and does not account for water or other impossible geographic terrain), and a list of suggested venues close to the calculated mid-point coordinate is found using [Foursquare's Places API](https://developer.foursquare.com/places-api).

## Finding the midpoint between two geographical coordinates

Initially I found this solution:

> https://stackoverflow.com/questions/4656802/midpoint-between-two-latitude-and-longitude

However, the math isn't that straightforward, even though I can still convert it to JS.

With a bit of effort I managed to find this library: https://github.com/Turfjs/turf. Which seems to have decent support and relatively recent activity. Through its documentation it seems quite straightforward to use, at least for my needs for sure.

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
