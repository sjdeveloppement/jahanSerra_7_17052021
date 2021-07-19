<template>
<v-container  >
     <div >
       <v-card width="400"  >
         <div class="pl-1">
        <v-card-title class="mt-8"><p>Profil</p></v-card-title>
        <v-avatar size="160" >
      <img 
        :src="user.user_image"
        alt="img profil default"
      >
    </v-avatar>
    <v-spacer></v-spacer>
    <v-card-text class="font-weight-bold ml-2 mb-2">
    <p >Mon pseudo : {{user.user_pseudo}}</p>
    <p >Mon email: {{user.user_mail}}</p>
    </v-card-text>
    <v-btn @click="logout" class="ma-2"> <v-icon
          dark
          left
        >
          mdi-minus-circle
        </v-icon>Déconnexion</v-btn>
    </div>
    </v-card>
    </div>
</v-container>
   
</template>
<script>
import { mapState } from 'vuex'
// const axios = require("axios").default;
export default {
  name: 'Account',
  mounted: function (){
    console.log(this.$store.state.user);
    // si l'utilisateur n'est pas connecté go page de connexion sinon j'affiche les infos
    if(this.$store.state.user.userID == -1){
      this.$router.push('/sign-in');
      return;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods:{
    logout: function(){
      this.$store.commit('logout');
      this.$router.push('/sign-in');
    }
  }
}

</script>
