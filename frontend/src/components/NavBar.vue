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
        :to="sign"
        text
    >
    <span class="mr-2" style ="color: #D1515A"><strong>Sign in</strong></span>
    </v-btn>
    <v-btn 
        :to="register"
        text
    >
    <span class="mr-2" style ="color: #D1515A"><strong>Register</strong></span>
    </v-btn>
    <v-btn
        
        :to="account"
        text
        
    >
    <span class="mr-2" style ="color: #D1515A"><strong>Account</strong></span>
    </v-btn>
    <v-btn 
        :to="tchat"
        text
    >
    <span class="mr-2" style ="color: #D1515A"><strong>Tchat</strong></span>
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
