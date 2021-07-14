<template>
<v-container>
  <v-Foot
    color="#122441"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="#D1515A"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class=" py-4 text-center"
        style ="background-color: #122441; color: #D1515A" 
        cols="12"
        
      >
        {{ new Date().getFullYear() }} — <strong>MyGroupomania</strong>
      </v-col>
    </v-row>
  </v-Foot>
</v-container>
  
</template>
<script>
  export default {
    name: 'Foot',
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Contact Us',
      ],
    }),
  }
</script>
<style scoped>

</style>