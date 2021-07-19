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
    userInfos:{
      user_pseudo:'',
      user_mail:'',
      user_image:'',
    }
  },
  mutations: {
    setStatus: function (state, status){
      state.status = status;
    },
    logUser: function (state, user){
      instance.defaults.headers.common['Authorization'] = user.token; 
      
      state.user = user;
      sessionStorage.setItem('token', state.user.token);
      sessionStorage.setItem('userID', state.user.userID);//
    },
    userInfos: function (state, userInfos){
      //instance.defaults.headers.common['Authorization'] = state.user.token;
      state.userInfos = userInfos;
    },
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
     
    },
    register: ({commit}, userInfos) => {
      commit('setStatus','loading');
      return new Promise((resolve, reject)=>{
        commit;
        instance.post('/register', userInfos)
        .then(function (response){
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error){
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
     
    },
    getUserInfos: ({commit})=>{
      const getUserID = sessionStorage.getItem('userID');
      //
      instance.get('/users/'+ getUserID)
        .then(function (response){
          commit('userInfos', response.data);
        })
        .catch(function (error){
          console.log(error.response);
        });
    }
  },
  modules: {
  }
})
