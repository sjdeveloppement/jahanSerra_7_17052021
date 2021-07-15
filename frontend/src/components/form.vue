<template>
  <v-container>
    <v-row>
      <v-col>
          <v-form ref="form"  >
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field><v-alert v-if="error" type="error">
      Email invalide.
    </v-alert>

            <v-text-field
              v-model="password"
              label="Password"
              required
            ></v-text-field>
            <v-alert v-if="error"  type="error">
      Password invalide.
    </v-alert>
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
  </v-container>
</template>
<script>
export default {
  name: "formulaire",

  props: [

    

  ],
  data: () => ({
    email : "",
    password: "",
  }),
  methods: {
    validate() {
      this.$emit("validFormStart", this.email);
    }
  },


};
</script>
