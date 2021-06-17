<template>
  <div>
    <div id="nav">
      <nav-bar></nav-bar>
    </div>
    <v-main class="my-10">
      <router-view/>
    </v-main>
  </div>
</template>
<script>

import NavBar from "@/components/NavBar";

export default{

  name: 'App',

   components: {
    NavBar
   }
}
</script>
