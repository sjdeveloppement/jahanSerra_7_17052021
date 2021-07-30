<template>
  <nav >
    <v-app-bar app color="#000033" >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="#EF5D60"
        aria-label="navbtn"
        name="navbtn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        class="display-1 Bold text"
        style="cursor: pointer; color: #ef5d60"
        >Groupomania
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute left  temporary
      ><v-list nav dense 
        ><v-list-item-group v-model="group" 
          ><v-list-item>
            <v-btn :to="sign" text>
              <span class="mr-2" style="color: #000033"
                ><strong>Sign in</strong></span
              >
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn :to="register" text>
              <span class="mr-2" style="color: #000033"
                ><strong>Register</strong></span
              >
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn :to="account" text>
              <span class="mr-2" style="color: #000033"
                ><strong>Account</strong></span
              >
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-btn :to="tchat" text>
              <span class="mr-2" style="color: #000033"
                ><strong>Tchat</strong></span
              >
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list></v-navigation-drawer
    >
  </nav>
</template>
<script>
export default {
  name: "NavBar",

  components: {},

  data: () => ({
    drawer: false,
    group: null,
    home: "/",
    sign: "/sign-in",
    register: "/register",
    account: "/account",
    tchat: "/tchat",
  }),
  watch: {
      group () {
        this.drawer = false
      },
    },
};
</script>
