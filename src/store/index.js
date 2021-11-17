import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import router from "../router";

const BASE_URL = "http://localhost:3000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    loading: false,
    error: null,
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async login({ commit }, form) {
      commit("SET_LOADING", true);
      try {
        const { data } = await axios.post(`${BASE_URL}/login`, form);
        localStorage.setItem("token", data.token);
        commit("SET_TOKEN", data.token);
        router.push("/");
      } catch (error) {
        const err = error.response.data.msg;
        commit("SET_ERROR", err);
      }
      commit("SET_LOADING", false);
    },
  },
  modules: {},
});
