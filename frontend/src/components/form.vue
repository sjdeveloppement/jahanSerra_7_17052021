<template>
  <v-container>
    <v-row>
      <v-col>
          <v-form ref="form">
            <v-text-field
              v-model="user_mail"
              label="E-mail"
              name="user_mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="user_password"
              label="Password"
              name="user_password"
              required
            ></v-text-field>
            <v-alert v-if="status=='error_login'"  type="error">
      Identifiants invalide.
    </v-alert>
            <v-btn
              color="#D1515A"
              class="mr-4 white--text"
              
              @click="login()"
            >
              Validate
            </v-btn>
            
          </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
//const axios = require("axios").default;
//import router from "../router/index.js";
import { mapState } from 'vuex';
export default {
  name: "formulaire",

  props: [

  ],
  data: () => ({
    user_mail : "",
    user_password: "",
  }),
  //
  methods: {
     login(){
      const self = this;
      this.$store.dispatch('login',{
        user_mail: this.user_mail,
        user_password: this.user_password,
      }).then(function (){
        self.$router.push('/Account');
      },function (error){
        console.log(error);
      })
    },
    /*sendPost() {
      postData = { email: this.email, password: this.password };
      axios
        .post("http://localhost:3000/api/auth/login", postData)
        .then(function (response) {
          sessionStorage.setItem("userId", response.data.userID);
          sessionStorage.setItem("token", response.data.token);
          //sessionStorage.setItem("isadmin", response.data.user_isadmin);
          router.push("account");
        });
    },*/
  },
  computed:{
   ...mapState(['status'])
  },


};
</script>
