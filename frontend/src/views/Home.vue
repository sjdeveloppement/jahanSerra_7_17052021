<template>
  <v-container class="home">
    <h1>MyGroupomania</h1>
    <formulaire ></formulaire>
    
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
    
  }),

  methods: {
    formValidFromChild(name) {
      console.log("Recevoir form valid de mon enfant: " + name);
    }
  }
}
</script>