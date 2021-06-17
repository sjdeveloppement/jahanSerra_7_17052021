<template>
  <div class="home">
    <h1>Ici Homepage</h1>
    <formulaire></formulaire>
  </div>
</template>

<script>
// @ is an alias to /src

import formulaire from "@/components/form.vue"

export default {
  name: 'Home',
  components: {
    formulaire
  }
}
</script>