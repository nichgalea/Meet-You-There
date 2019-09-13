import Vue from "vue";
import Vuex from "vuex";
import * as Foursquare from "@/models/foursquare";

Vue.use(Vuex);

interface State {
  venuesA: Foursquare.Venue[];
  venuesB: Foursquare.Venue[];
}

export default new Vuex.Store<State>({
  state: {
    venuesA: [],
    venuesB: []
  },
  mutations: {
    clearVenues(state) {
      state.venuesA = [];
      state.venuesB = [];
    },
    setVenuesA(state, venues: Foursquare.Venue[]) {
      state.venuesA = venues;
    },
    setVenuesB(state, venues: Foursquare.Venue[]) {
      state.venuesB = venues;
    }
  },
  actions: {
    clearVenues(context) {
      context.commit("clearVenues");
    },
    setVenuesA(context, venues: Foursquare.Venue[]) {
      context.commit("setVenuesA", venues);
    },
    setVenuesB(context, venues: Foursquare.Venue[]) {
      context.commit("setVenuesB", venues);
    }
  }
});
