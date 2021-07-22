<template>
  <v-container>
    <div>
      <v-card width="400">
        <div class="pl-1">
          <v-card-title class="mt-8"><p>Profil</p></v-card-title>
          <v-avatar size="160">
            <img :src="user.user_image" alt="avatar" />
          </v-avatar>
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
// const axios = require("axios").default;
export default {
  name: "Account",
  components: {
    ModifFormUser,
  },
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
  },
};
</script>
