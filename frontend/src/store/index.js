import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

Vue.use(Vuex)
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;


export default new Vuex.Store({
  state: {
    status: '',
    user: {
      token: '',
      userID: -1,
    } 
      ,
    userInfos:''
  },
  mutations: {
    setStatus: function (state, status){
      state.status = status;
    },
    logUser: function (state, user){
      //instance.defaults.headers.common['Authorization'] = user.token; 
      
      state.user = user;
      localStorage.setItem('token', user.token);
      localStorage.setItem('userID', JSON.stringify(user.userID));//
      console.log(localStorage);
    },
    userInfos: function (state, userInfos){
      //instance.defaults.headers.common['Authorization'] = state.user.token;
      state.userInfos = userInfos;
    },
    logout:function (state){
      state.user ={
        userID:-1,
        token:'',
      }
      localStorage.removeItem('user');
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
     
    },
    register: ({commit}, userInfos) => {
      commit('setStatus','loading');
      return new Promise((resolve, reject)=>{
        commit;
        instance.post('register', userInfos)
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
      const getUserID = localStorage.getItem('userID');
      
      //console.log(localStorage);
      //
      instance.get('/users/'+ getUserID, )
        .then(function (response){
          commit('userInfos', response.data);
        })
        .catch(function (error){
         // console.log(sessionStorage);
          console.log(error.response);
        });
    }
  },
  modules: {
  }
})
