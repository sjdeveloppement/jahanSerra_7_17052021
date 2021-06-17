<template>
  <v-container class="sign-in">
    <h1>Se connecter</h1>
    <formulaire
      :bindChien="chien"
      @validFormStart="formValidFromChild"
    ></formulaire>
    
  </v-container>
</template>
<script>
// @ is an alias to /src

import formulaire from "@/components/form.vue";



export default {
  name: "Sign-in",
  components: {
    formulaire
    
  },
  data: () => ({
    chien: "Toto",
  }),

  methods: {
    formValidFromChild(name) {
      console.log("Recevoir form valid de mon enfant: " + name);
    },
  },
};
</script>
