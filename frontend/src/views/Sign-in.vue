<template>
  <v-container class="sign-in">
    <h1>Se connecter</h1>
    <formulaire></formulaire>
  </v-container>
</template>
<script>

// @ is an alias to /src

import formulaire from "@/components/form.vue";



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
};
</script>
