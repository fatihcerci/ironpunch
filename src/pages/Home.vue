<template>
  <q-page q-layout view="hHh lpR fFf">

    <div class="row justify-center" style="height:90px" v-if="!$q.screen.gt.sm">
      <img
          src="~/assets/ironpunch.svg"
          style="position:absolute; top:-120px;"
          width="400"
        />
    </div>

    <div class="row justify-center" style="height:190px" v-if="$q.screen.gt.sm">
      <img
          src="~/assets/ironpunch.svg"
          style="position:absolute; top:-280px;"
        />
    </div>

    <profiles />
  </q-page>
</template>

<script>
import { defineAsyncComponent, onMounted } from "vue"
import { useQuasar } from 'quasar'

export default {
  name: "Home",
  components: {
    Profiles: defineAsyncComponent(() =>
      import("src/components/cards/Profiles.vue")
    ),
  },

  setup() {
    const $q = useQuasar()

    onMounted(async () => {
    })


    return {
    }
  },
}
</script>
