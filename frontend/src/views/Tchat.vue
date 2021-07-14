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
    }
}
</script>