# meet-you-there

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

## Finding the midpoint between two geographical coordinates

Initially I found this solution:

> https://stackoverflow.com/questions/4656802/midpoint-between-two-latitude-and-longitude

However, the math isn't that straightforward, even though I can still convert it to JS.

With a bit of effort I managed to find this library: https://github.com/Turfjs/turf. Which seems to have decent support relatively recent activity. Through its documentation it seems quite straightforward to use, at least for my needs for sure.
