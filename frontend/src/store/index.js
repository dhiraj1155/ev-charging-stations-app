import { createStore } from 'vuex';
  import axios from 'axios';

  export default createStore({
    state: {
      token: localStorage.getItem('token') || '',
      chargers: [],
    },
    getters: {
      isAuthenticated: (state) => !!state.token,
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      clearToken(state) {
        state.token = '';
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      },
      setChargers(state, chargers) {
        state.chargers = chargers;
      },
    },
    actions: {
      async login({ commit }, credentials) {
        try {
          const response = await axios.post('https://ev-charging-stations-app.onrender.com/api/auth/login', credentials);
          commit('setToken', response.data.token);
          return response.data;
        } catch (error) {
          throw error.response.data;
        }
      },
      async register({ commit }, credentials) {
        try {
          const response = await axios.post('https://ev-charging-stations-app.onrender.com/api/auth/register', credentials);
          commit('setToken', response.data.token);
          return response.data;
        } catch (error) {
          throw error.response.data;
        }
      },
      logout({ commit }) {
        commit('clearToken');
      },
      async fetchChargers({ commit }) {
        try {
          const response = await axios.get('https://ev-charging-stations-app.onrender.com/api/chargers');
          commit('setChargers', response.data);
        } catch (error) {
          console.error('Error fetching chargers:', error);
        }
      },
      async createCharger({ dispatch }, charger) {
        try {
          await axios.post('https://ev-charging-stations-app.onrender.com/api/chargers', charger);
          dispatch('fetchChargers');
        } catch (error) {
          throw error.response.data;
        }
      },
      async updateCharger({ dispatch }, { id, charger }) {
        try {
          await axios.put(`https://ev-charging-stations-app.onrender.com/api/chargers/${id}`, charger);
          dispatch('fetchChargers');
        } catch (error) {
          throw error.response.data;
        }
      },
      async deleteCharger({ dispatch }, id) {
        try {
          await axios.delete(`https://ev-charging-stations-app.onrender.com/api/chargers/${id}`);
          dispatch('fetchChargers');
        } catch (error) {
          throw error.response.data;
        }
      },
    },
  });