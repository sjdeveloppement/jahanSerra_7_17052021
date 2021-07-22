<template>
  <v-container class="register">
    <h1>S'inscrire sur MyGroupomania</h1>
    <register-form></register-form>
    
  </v-container>
  
</template>
<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
  components: { RegisterForm},
  name: "Register", 
  mounted: function(){
    // si l'utilisateur est  connecté go page d'account
     if(localStorage.getItem('user')){
      this.$router.push('/Account');
      return;
    }
  },
};
</script>
