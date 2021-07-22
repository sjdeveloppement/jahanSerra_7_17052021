<template>
 
        <form>
            <v-card class=" mt-3 pl-3 pr-3 pt-3 pb-3 ">
              <v-card-title>Update infos</v-card-title>
             
    <v-text-field
      v-model="user_pseudo"
      :error-messages="pseudoErrors"
      label="Nickname"
      
      @input="$v.user_pseudo.$touch()"
      @blur="$v.user_pseudo.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="user_mail"
      :error-messages="emailErrors"
      label="E-mail"
      
      @input="$v.user_mail.$touch()"
      @blur="$v.user_mail.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="user_password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      :error-messages="passwordErrors"
      label="Password"
      @input="$v.user_password.$touch()"
      @blur="$v.user_password.$touch()"
    ></v-text-field>
     <v-file-input
    @change ="user_image($event)" type="file" id="myfile"
    :rules="rules"
    accept="image/png, image/jpeg, image/jpg, image/gif"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    label="Avatar"
  ></v-file-input>

    <v-btn
      class="mr-4"
      @click="submitModifUser"
    >
      Modify
    </v-btn>
  
    </v-card>
  </form>
    
</template>
<script>
import { validationMixin } from 'vuelidate'
import { email, minLength } from 'vuelidate/lib/validators'
export default {
    name: "ModifFormUser",
    mixins: [validationMixin],

    validations: {
        
      user_mail: {  email },
      user_pseudo:{ minLength: minLength(2) },
      user_password: { minLength: minLength(8)},
      
    },
    data: ()=> ({
        user_pseudo:'',
        user_mail:'',
        user_password:'',
        user_image: '',
        rules: [
        value => !value || value.size < 1000000 || 'Avatar size should be less than 1 MB!',
      ],
      show1: false,
    }),
    computed:{
        pseudoErrors () {
        const errors = []
        if (!this.$v.user_pseudo.$dirty) return errors
        !this.$v.user_pseudo.minLength && errors.push('Name must be at least 2 characters long')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.user_mail.$dirty) return errors
        !this.$v.user_mail.email && errors.push('Must be valid e-mail')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.user_password.$dirty) return errors
        !this.$v.user_password.minLength && errors.push('Password must be at least 8 characters long')
        return errors
      },
    },
    methods: {// test modification de l'utilisateur
    //
        user_image(event){
              this.$store.state.user_image = event.target.files[0];
              const user_image = event.target.files[0];
              const formData = new FormData();
              formData.append("user_image", user_image);
            },
            //
        submitModifUser: function(){
            //const self = this;
            this.$store.dispatch('update',{
              user_pseudo: this.user_pseudo,
              user_mail: this.user_mail,
              user_password: this.user_password,
              user_image: this.user_image,
            }).then(function(){
              console.log('updated');
            }).catch(function(error){
              console.log(error);
              
            })
        },
    }
}
</script>
