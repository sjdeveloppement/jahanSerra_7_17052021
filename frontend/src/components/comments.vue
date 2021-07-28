<template >
   <div v-if="message.comments != ''">
    <v-card style="display: flex; justify-content: space-between"
      ><div style="box-shadow: 1px 1px 10px #d1515a">
        <v-list-item-avatar
          ><v-img :src="message.avatarcomment"
        /></v-list-item-avatar>
        <p v-html="message.pseudocomment"></p>
      </div>
      <div class="ml-2">
        <p v-html="message.comments"></p>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
    name: "comments",
}
</script>
