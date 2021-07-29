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
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="user_password"
            label="Password"
            name="user_password"
            required
          ></v-text-field>
          <v-alert v-if="status == 'error_login'" type="error">
            Identifiant et/ou mot de passe invalide 1 majuscule, 1 minuscule, 1 caractères spécial et 8 caractères minimum!
          </v-alert>
          <v-btn color="#D1515A" class="mr-4 white--text" @click="login()"
            ><span v-if="status == 'loading'">Connexion en cours</span>
            <span v-else>Connexion</span>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
//const axios = require("axios").default;
//import router from "../router/index.js";
import { mapState } from "vuex";
export default {
  name: "formulaire",

  props: [],
  data: () => ({
    user_mail: "",
    user_password: "",
    show1: false,
  }),
  //
  methods: {
    login() {
      const self = this;
      this.$store
        .dispatch("login", {
          user_mail: this.user_mail,
          user_password: this.user_password,
        })
        .then(
          function () {
            self.$router.push("/Account");
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
  mounted: function () {
    // si l'utilisateur est  connecté go page d'account
    if (this.$store.state.user.userID != -1) {
      this.$router.push("/Account");
      return;
    }
  },
  computed: {
    ...mapState(["status"]),
  },
};
</script>
