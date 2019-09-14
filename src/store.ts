import Vue from "vue";
import Vuex from "vuex";
import * as Location from "@/models/location";

Vue.use(Vuex);

interface State {
  locationA: Location.Coordinates | null;
  locationB: Location.Coordinates | null;
}

export default new Vuex.Store<State>({
  state: {
    locationA: null,
    locationB: null
  },
  mutations: {
    setLocationA(state, location: Location.Coordinates) {
      state.locationA = location;
    },
    setLocationB(state, location: Location.Coordinates) {
      state.locationB = location;
    }
  },
  actions: {
    setLocationA(context, location: Location.Coordinates) {
      context.commit("setLocationA", location);
    },
    setLocationB(context, location: Location.Coordinates) {
      context.commit("setLocationB", location);
    }
  }
});
