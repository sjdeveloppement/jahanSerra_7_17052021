<template>
  <v-container>
    <div>
      <v-card width="400">
        <div class="pl-1">
          <v-card-title class="mt-8"><p>Profil</p></v-card-title>
          <v-avatar size="160">
            <img :src="user.user_image" alt="avatar" />
          </v-avatar>
          <!--User image -->
          <v-file-input
    @change ="user_image($event)" type="file" id="myfile"
    :rules="rules"
    accept="image/png, image/jpeg, image/jpg, image/gif"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    label="Avatar"
  ></v-file-input>
  <!--User image -->
          <v-spacer></v-spacer>
          <v-card-text class="font-weight-bold ml-2 mb-2">
            <p>My Nickname : {{ user.user_pseudo }}</p>
            <p>My email: {{ user.user_mail }}</p>
          </v-card-text>
          <v-btn @click="logout" class="ma-2">
            <v-icon dark left> mdi-minus-circle </v-icon>Disconnect</v-btn
          >
        </div>
      </v-card>
    </div>
    <ModifFormUser />
    <br>
    <div style="display: flex; justify-content: center">
      
      <v-btn class="button ma-2 white--text" color="#D1515A" ><v-icon dark left> mdi-cancel </v-icon> Delete Profil</v-btn>
    </div>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import ModifFormUser from "@/components/ModifFormUser.vue";
const axios = require('axios');
// const axios = require("axios").default;
export default {
  name: "Account",
  components: {
    ModifFormUser,
  },
  data:()=>({
     rules: [
        value => !value || value.size < 1000000 || 'Avatar size should be less than 1 MB!',
      ],
  }),
  mounted: function () {
    console.log(this.$store.state.user);
    // si l'utilisateur n'est pas connecté go page de connexion sinon j'affiche les infos
    if (this.$store.state.user.userID == -1) {
      this.$router.push("/sign-in");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/sign-in");
    },
    user_image(event){
      //this.$store.state.user_image= event.target.files[0];
      const URL = 'http://localhost:3000/api/auth/users/37/avatar';
      let data = new FormData();
      data.append('name', 'user_image');
      data.append('file', event.target.files[0]);
      let config={
        header:{
          'Content-Type': 'image/png'
        }
      }
      axios.put(
        URL,
        data,
        config
      ).then(
        response=>{
          console.log('image upload response >', response)
        }
      )
    }
  },
};
</script>
