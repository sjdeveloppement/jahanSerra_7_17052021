<template>
  <v-container>
    <v-row>
      <v-col>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              required
            ></v-text-field>
            <v-btn
              color="#D1515A"
              class="mr-4 white--text"
              @click="validate"
            >
              Validate
            </v-btn>
          </v-form>
      </v-col>
    </v-row>
  
    <v-row>
      <v-col>
        <p>Email: {{ email}}</p>
        <p>Password: {{ password }}</p>
        <p>Full name: {{ fullName }}</p>
        <p>Nom de chien: {{ bindChien }}</p>
      </v-col>
    </v-row>
  
  </v-container>
</template>
<script>
export default {
  name: "formulaire",

  props: [

    'bindChien'

  ],
  data: () => ({
    email : "",
    password: ""
  }),
  methods: {
    validate() {
      this.$emit("validFormStart", this.email);
    }
  },

  computed: {
    fullName() {
      return this.email + " " + this.password;
    }
  },

};
</script>
