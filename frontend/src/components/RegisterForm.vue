<template>
  <v-container>
    <form>
      <v-text-field
        v-model="user_pseudo"
        
        label="Pseudo"
        required
        
      ></v-text-field>
      <v-text-field
        v-model="user_mail"
        
        label="E-mail"
        required
        
      ></v-text-field>
     
      <v-text-field
        v-model="user_password"
        
        label="Mot de passe"
        required
        
      ></v-text-field>
       <v-alert v-if="status=='error_create'"  type="error">
      Identifiants invalide.
    </v-alert>
      <v-checkbox 
        v-model="checked"
        v-on:click="showValidationbtn = !showValidationbtn"
        label="En validant cette case j'accepte la politique RGPD de l'application MyGroupomania."
        required
      ></v-checkbox>
      <v-btn @click="register()" class="mr-4 white--text" style="background-color: #D1515A" v-show="!showValidationbtn" :class="{'button--disabled' : !validatedFileds}" >
         <span v-if="status == 'loading'">Inscription en cours</span>
            <span v-else>S'inscrire</span> </v-btn>
      
    </form>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';

    export default {
        name: "registerform",
        data: ()=>({
            user_pseudo : "",
            user_mail: "",
            user_password: "",
            errors:{
              pseudoErrors: "Veuillez rentrer un pseudo valide ! ",
              emailErrors: "Veuillez rentrer une adresse mail valide !",
              passwordErrors: "Veuillez rentrer un mdp valide !",
              checkboxErrors: "Veuillez accepter les conditions de la politique RGPD pour vous inscrire.",
            },
            showValidationbtn: true,
            checked: false,
        }),
        computed: {
          validatedFileds: function (){
            if(this.user_pseudo !="" && this.user_mail !="" && this.user_password !=""){
              return true;
            }
            else{
              return false;
            }
          },
          ...mapState(['status']),
        },
        methods:  {
            checkbox(){
                console.log('checkbox');
            },
            register: function (){
              const self = this;
              this.$store.dispatch('register',{
                user_pseudo: this.user_pseudo,
                user_mail: this.user_mail,
                user_password: this.user_password,
              }).then(function (){
                self.$router.push('/sign-in');
              }, function(error){
                console.log(error);
              })
              
            },
            
            

        }
    };
</script>
