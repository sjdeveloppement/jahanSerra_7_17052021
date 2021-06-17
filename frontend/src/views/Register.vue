<template>
  <v-container class="register">
    <h1 class="primary--text">S'inscrire sur Groupomania</h1>
    <register-form></register-form>
  </v-container>
</template>
<script>
import RegisterForm from '../components/RegisterForm.vue';
export default {
  components: { RegisterForm },
  name: "Register",
};
</script>
