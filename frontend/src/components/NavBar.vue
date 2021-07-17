<template>
   <nav>
    <v-app-bar
        app
        color="#122441"
        
    >
      <v-toolbar-title
          class="display-1 Bold text" 
          style="cursor:pointer; color: #D1515A">Groupomania
      </v-toolbar-title>

      <v-spacer></v-spacer>
    <v-btn 
        :to="home"
        text
    >
    <span class="mr-2" style ="color: #D1515A">Home</span>
    </v-btn>
    <v-btn 
        :to="sign"
        text
    >
    <span class="mr-2" style ="color: #D1515A">Sign in</span>
    </v-btn>
    <v-btn 
        :to="register"
        text
    >
    <span class="mr-2" style ="color: #D1515A">Register</span>
    </v-btn>
    <v-btn 
        :to="account"
        text
    >
    <span class="mr-2" style ="color: #D1515A">Account</span>
    </v-btn>
    <v-btn 
        :to="tchat"
        text
    >
    <span class="mr-2" style ="color: #D1515A">Tchat</span>
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
      sign: "/sign-in",
      register: "/register",
      account: "/account",
      tchat: "/tchat"

  })

}
</script>
