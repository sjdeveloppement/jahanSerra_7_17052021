<template>
<v-container  >
     <div >
       <v-card width="400"  >
         <div class="pl-1">
        <v-card-title class="mt-8"><p>Profil</p></v-card-title>
        <v-avatar size="160" >
      <img 
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="img profil default"
      >
    </v-avatar>
    <v-spacer></v-spacer>
    <v-card-text class="font-weight-bold ml-2 mb-2">
    <p >Mon pseudo : {{}}</p>
    <p >Mon email: {{}}</p>
    </v-card-text>
    </div>
    </v-card>
    </div>
</v-container>
   
</template>
<script>
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
  }
}
</script>
