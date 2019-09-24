import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    token: ""
  },
  mutations: {
    isLoggedIn(state, value, token) {
      state.loggedIn = value[0];
      state.token = value[1];
    }
  },
  actions: {
    isLoggedIn(context, value) {
      context.commit("isLoggedIn", value);
    }
  }
});
