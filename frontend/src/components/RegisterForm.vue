<template>
  <v-container>
    <form>
      <v-text-field
        v-model="pseudo"
        
        label="Pseudo"
        required
        
      ></v-text-field>
      <v-text-field
        v-model="email"
        
        label="E-mail"
        required
        
      ></v-text-field>
      <v-text-field
        v-model="password"
        
        label="Mot de passe"
        required
        
      ></v-text-field>
      <v-checkbox
        v-model="checkbox"
        label="En validant cette case j'accepte la politique RGPD de l'application MyGroupomania."
        required
      ></v-checkbox>
      <v-btn class="mr-4 white--text" style="background-color: #D1515A" > s'inscrire </v-btn>
    </form>
  </v-container>
</template>
<script>
    export default {
        name: "registerform",
        data: ()=>({
            pseudo : "",
            email: "",
            password: "",
            pseudoErrors: "Veuillez rentrer un pseudo valide ! ",
            emailErrors: "Veuillez rentrer une adresse mail valide !",
            passwordErrors: "Veuillez rentrer un mdp valide !",
            checkboxErrors: "Veuillez accepter les conditions de la politique RGPD pour vous inscrire."


        }),
        methods:  {
            checkbox(){
                console.log('checkbox');
            }

        }
    };
</script>
