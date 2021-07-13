<template>
  <v-container class="home">
    <h1>Ici Homepage</h1>
    <formulaire :bindChien="chien" @validFormStart="formValidFromChild"></formulaire>
  </v-container>
</template>

<script>
// @ is an alias to /src

import formulaire from "@/components/form.vue"

export default {
  name: 'Home',
  components: {
    formulaire
  },

  data: () => ({
    chien : "Toto"
  }),

  methods: {
    formValidFromChild(name) {
      console.log("Recevoir form valid de mon enfant: " + name);
    }
  }
}
</script>