<template>
  <v-container>
    <div>
      <v-card width="400">
        <div class="pl-1">
          <v-card-title class="mt-8"><h1>Profil</h1></v-card-title>
          <v-avatar size="160">
            <img :src="user.user_image" alt="avatar" />
          </v-avatar>
          <!--User image -->
          <v-file-input
            type="file"
            id="file"
            :rules="rules"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
          ></v-file-input>
          <v-btn
            class="ml-2 white--text"
            name="send"
            color="#000033"
            @click="sendImg()"
            >Send Avatar</v-btn
          >
          <!--User image -->
          <v-spacer></v-spacer>
          <v-card-text class="font-weight-bold ml-2 mb-2">
            <p>My Nickname : {{ user.user_pseudo }}</p>
            <p>My email: {{ user.user_mail }}</p>
          </v-card-text>
          <v-btn @click="logout" name="disconnect" class="ma-2">
            <v-icon dark left> mdi-minus-circle </v-icon>Disconnect</v-btn
          >
        </div>
      </v-card>
    </div>
    <ModifFormUser />
    <br />
    <div style="display: flex; justify-content: center">
      <v-btn
        class="button ma-2 white--text"
        color="#000033"
        id="deleteProfil"
        name="deleteprofil"
        type="sumbit"
        @click="DeleteProfil()"
        ><v-icon dark left> mdi-cancel </v-icon> Delete Profil</v-btn
      >
    </div>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import ModifFormUser from "@/components/ModifFormUser.vue";
const axios = require("axios");
// const axios = require("axios").default;
export default {
  name: "Account",
  components: {
    ModifFormUser,
  },
  data: () => ({
    rules: [
      (value) =>
        !value ||
        value.size < 1000000 ||
        "Avatar size should be less than 1 MB!",
    ],
    user_image: "",
  }),
  mounted: function () {
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
      localStorage.clear();
      this.$router.push("/sign-in");
    },
    sendImg() {
      //this.$store.state.user_image= event.target.files[0];
      const getUserID = localStorage.getItem("userID");
      const URL = `http://localhost:3000/api/auth/users/${getUserID}/avatar`;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      //Récuperation de l'image
      let img = document.getElementById("file").files[0];
      //Création d'un formData obligatoire pour l'envoi de l'image

      var formData = new FormData();
      formData.append("img", img);
      //Envoi des données sur l'url du serveur
      axios
        .put(URL, formData)
        .then((response) => {
          console.log("image upload response ", response);
          document.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    DeleteProfil() {
      const getUserID = localStorage.getItem("userID");

      const URL = `http://localhost:3000/api/auth/users/${getUserID}`;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      axios
        .delete(URL)
        .then((response) => {
          this.$store.commit("logout");
          this.$router.push("/sign-in");
          localStorage.clear();

          console.log(response);
        })
        .catch(console.log("error "));
    },
  },
};
</script>
