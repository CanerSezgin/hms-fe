import Vue from 'vue';
import Vuex from 'vuex';
import { authService } from '@/services/api';
import router from '../router';

Vue.use(Vuex);

// Some Gotchas
// Token should be verified on Backend and user data should be fetched from BE via token instead storing in localstorage.
// Token should be stored in cookie instead localstorage

export default new Vuex.Store({
  state: {
    testMode: true,
    token: localStorage.getItem('hms-token') || null,
    user: localStorage.getItem('hms-user')
      ? JSON.parse(localStorage.getItem('hms-user'))
      : null,
  },
  getters: {
    isAuth(state) {
      return !!state.token && !!state.user;
    },
    userType(state) {
      return state.user ? state.user.userType : null;
    },
    userId(state){
      return state.user ? state.user._id : null
    }
  },
  mutations: {
    LOGIN(state, data) {
      state.token = data.token;
      state.user = data.user;
      localStorage.setItem('hms-token', data.token);
      localStorage.setItem('hms-user', JSON.stringify(data.user));
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('hms-token');
      localStorage.removeItem('hms-user');
    },
  },
  actions: {
    async login({ commit, getters }, form) {
      const data = await authService.signin(form);
      commit('LOGIN', data);
      router.push(`/${getters.userType}`);
    },
    logout({ commit }) {
      commit('LOGOUT');
      router.push('/');
    },
  },
});
