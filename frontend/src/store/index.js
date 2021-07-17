import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user: {
      userID: -1,
      token:'',
    },
  },
  mutations: {
    setStatus: function (state, status){
      state.status = status;
    },
    logUser: function (state, user){
      state.user = user;
    }
  },
  actions: {
    login: ({commit}, userInfos)=>{
      commit('setStatus','loading');
      return new Promise((resolve, reject)=>{
        instance.post('/login', userInfos)
        .then(function (response){
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error){
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
     
    }
  },
  modules: {
  }
})
