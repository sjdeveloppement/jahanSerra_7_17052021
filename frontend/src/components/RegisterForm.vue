<template>
  <v-container>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        label="Name"
        required
        
      ></v-text-field>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        
      ></v-text-field>
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="En validant cette case j'accepte la politique RGPD de l'application Groupomania."
        required
       
      ></v-checkbox>
      <v-btn class="mr-4" > submit </v-btn>
    </form>
  </v-container>
</template>
<script>
    export default {
        name: "registerform",
        data: ()=>({
            name : "",
            email: "",
            nameErrors: "Veuillez rentrer un nom valide ! ",
            emailErrors: "Veuillez rentrer une adresse mail valide !",
            checkboxErrors: "Veuillez accepter les conditions de la politique RGPD pour vous inscrire."


        }),
        methods:  {
            checkbox(){
                console.log('checkbox');
            }

        }
    };
</script>
