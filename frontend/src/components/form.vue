<template>
  <v-container>
    <v-row>
      <v-col>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="name"
              label="Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
            <v-btn
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>
          </v-form>
      </v-col>
    </v-row>
  
    <v-row>
      <v-col>
        <p>Name: {{ name }}</p>
        <p>Email: {{ email }}</p>
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
    name : "",
    email: ""
  }),
  methods: {
    validate() {
      this.$emit("validFormStart", this.name);
    }
  },

  computed: {
    fullName() {
      return this.name + " " + this.email;
    }
  },

};
</script>
