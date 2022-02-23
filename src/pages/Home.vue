<template>
  <q-page q-layout view="hHh lpR fFf">

    <div class="row justify-center" style="height:200px">
      <img
          src="~/assets/ironpunch.svg"
          style="position:absolute; top:-270px;"
        />
    </div>

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
