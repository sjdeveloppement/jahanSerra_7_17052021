<template>
  <v-container class="sign-in">
    <h1>Se connecter</h1>
    <v-alert v-if="status == 'created'"
  type="success"
>Votre compte à bien été crée !</v-alert>
    <formulaire></formulaire>
  </v-container>
</template>
<script>

// @ is an alias to /src

import formulaire from "@/components/form.vue";
import {mapState} from "vuex";


export default {
  name: "Sign-in",
  components: {
    formulaire,
  },
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    
  },
  computed: {
    ...mapState(["status"]),
  },
};
</script>
