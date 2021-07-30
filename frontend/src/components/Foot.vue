<template>
<v-container>
  <v-footer
    color="#000033"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="#EF5D60"
        text
        rounded
        class="my-2 font-weight-bold"
      >
        {{ link }}
      </v-btn>
      <v-col

        class=" py-4 text-center font-weight-bold"
        style ="background-color: #000033; color: #EF5D60" 
        cols="12"
        
      >
        {{ new Date().getFullYear() }} — <strong>MyGroupomania</strong>
      </v-col>
    </v-row>
  </v-footer>
</v-container>
  
</template>
<script>
  export default {
    name: 'Foot',
    data: () => ({
      links: [
        'Home',
        'About Us',
        'RGPD',
        'Services',
        'Contact Us',
      ],
    }),
  }
</script>
<style scoped>

</style>