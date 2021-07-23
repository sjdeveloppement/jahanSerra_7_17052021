<template>
    <v-container class="tchat">
        <tchat></tchat>
    </v-container>
</template>
<script>
import tchat from "@/components/tchat.vue"
export default{
    name: "Tchat",
    components:{
        tchat
    },
    mounted: function () {
    console.log(this.$store.state.user);
    // si l'utilisateur n'est pas connecté go page de connexion sinon j'affiche les infos
    if (this.$store.state.user.userID == -1) {
      this.$router.push("/sign-in");
      return;
    }}
    

        
    
    
}
</script>