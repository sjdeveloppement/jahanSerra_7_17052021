<template>
   <nav>
    <v-app-bar
        app
        color="primary"
    >
      <v-toolbar-title
          class="display-1 Bold text"
          style="cursor:pointer">Hello
      </v-toolbar-title>

      <v-spacer></v-spacer>
    <v-btn 
        :to="home"
        text
    >
    <span class="mr-2">Home</span>
    </v-btn>
    <v-btn 
        :to="about"
        text
    >
    <span class="mr-2">About</span>
    </v-btn>
    </v-app-bar>
  </nav>
</template>
<script>

export default {
  name: 'NavBar',

  components: {
  },
  
  data: () => ({

      home: "/",
      about: "/about"

  })

}
</script>
