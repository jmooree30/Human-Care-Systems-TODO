import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    token: "",
    id: "",
    name: ""
  },
  mutations: {
    isLoggedIn(state, value) {
      state.loggedIn = value[0];
      state.token = value[1];
      state.id = value[2];
      state.name = value[3];
    }
  },
  actions: {
    isLoggedIn(context, value) {
      context.commit("isLoggedIn", value);
    }
  }
});
