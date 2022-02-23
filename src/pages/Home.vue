<template>
  <q-page q-layout view="hHh lpR fFf">
    <profiles />
  </q-page>
</template>

<script>
import { defineAsyncComponent, onMounted } from "vue"

export default {
  name: "Home",
  components: {
    Profiles: defineAsyncComponent(() =>
      import("src/components/cards/Profiles.vue")
    ),
  },

  setup() {

    onMounted(async () => {
    })


    return {
    }
  },
}
</script>
