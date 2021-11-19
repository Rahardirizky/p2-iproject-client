import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import router from "../router";

const BASE_URL = "https://laundry-application.herokuapp.com"

// const BASE_URL='http://localhost:3000'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    loading: false,
    error: null,
    orders: [],
    services: [],
    totalOrders: 0,
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
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_SERVICES(state, services) {
      state.services = services;
    },
    SET_TOTAL_ORDERS(state, totalOrders) {
      state.totalOrders = totalOrders
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, form) {
      commit("SET_LOADING", true);
      try {
        const { data } = await axios.post(`${BASE_URL}/login`, form);
        console.log({data});
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        commit("SET_TOKEN", data.token);
        commit("SET_USER", data.user);
        router.push("/");
      } catch (error) {
        const err = error.response.data.msg;
        commit("SET_ERROR", err);
      }
      commit("SET_LOADING", false);
    },

    async getOrders({ commit, state }, {page, limit, email}) {
      commit("SET_LOADING", true);
      try {
        let url = `${BASE_URL}/orders?page=${page}&limit=${limit}`
        
        if(email) {
          url += `&email=${email}`
        }
        const { data } = await axios.get(url, {
          headers: {
            token: state.token,
          },
        });
        if(state.user.role === 'Admin') {
          commit("SET_ORDERS", data.rows);
          commit('SET_TOTAL_ORDERS', data.count)
        } else {
          commit("SET_ORDERS", data);
        }
      } catch (error) {
        const err = error.response.data.msg;
        commit("SET_ERROR", err);
      }
      commit("SET_LOADING", false);
    },

    async editOrder({ commit, dispatch, state }, { id, status, payment }) {
      commit("SET_LOADING", true);
      try {
        await axios.put(
          `${BASE_URL}/orders/${id}`,
          { status, payment },
          {
            headers: {
              token: state.token,
            },
          }
        );
        dispatch("getOrders");
      } catch (error) {
        const err = error.response.data.msg;
        commit("SET_ERROR", err);
      }
      commit("SET_LOADING", false);
    },

    async getServices({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await axios.get(`${BASE_URL}/services`, {
          headers: {
            token: state.token,
          },
        });
        const services = data.map((el) => ({
          value: el.id,
          text: el.name,
        }));
        commit("SET_SERVICES", services);
      } catch (error) {
        const err = error.response.data.msg;
        commit("SET_ERROR", err);
      }
      commit("SET_LOADING", false);
    },

    async getTotalfee({ commit, state }, total) {
      commit("SET_LOADING", true);
      try {
        const { data } = await axios.post(`${BASE_URL}/orders/total`, total, {
          headers: {
            token: state.token,
          },
        });
        commit("SET_LOADING", false);
        return +data * 1000;
      } catch (error) {
        const err = error.response.data.msg;
        commit("SET_ERROR", err);
      }
      commit("SET_LOADING", false);
      return null;
    },

    async addOrder({ commit, state, dispatch }, form) {
      commit("SET_LOADING", true);
      try {
        await axios.post(`${BASE_URL}/orders`, form, {
          headers: {
            token: state.token,
          },
        });
        dispatch('getOrders')
      } catch (error) {
        const err = error.response.data.msg;
        commit("SET_ERROR", err);
      }
      commit("SET_LOADING", false);
    },
  },
  modules: {},
});
