<template>
   <nav>
    <v-app-bar
        app
        color="#000033"
        
    >
      <v-toolbar-title
          class="display-1 Bold text" 
          style="cursor:pointer; color: #EF5D60">Groupomania
      </v-toolbar-title>

      <v-spacer></v-spacer>
    <v-btn 
        :to="sign"
        text
    >
    <span class="mr-2" style ="color: #EF5D60"><strong>Sign in</strong></span>
    </v-btn>
    <v-btn 
        :to="register"
        text
    >
    <span class="mr-2" style ="color: #EF5D60"><strong>Register</strong></span>
    </v-btn>
    <v-btn
        
        :to="account"
        text
        
    >
    <span class="mr-2" style ="color: #EF5D60"><strong>Account</strong></span>
    </v-btn>
    <v-btn 
        :to="tchat"
        text
    >
    <span class="mr-2" style ="color: #EF5D60"><strong>Tchat</strong></span>
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
