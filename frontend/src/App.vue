<template>
  <div>
    <div id="nav">
      <nav-bar></nav-bar>
    </div>
    <v-main class="my-10">
      <router-view/>
    </v-main>
    <v-footer>
      <v-container>
        <div id="foot">
      <Foot />
    </div>
      </v-container>
      
    </v-footer>
    
  </div>
</template>
<script>

import NavBar from "@/components/NavBar";
import Foot from '@/components/Foot.vue';

export default{

  name: 'App',

   components: {
    NavBar,
    Foot
   }
}
</script>
