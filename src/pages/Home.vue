<template>
  <q-page q-layout view="hHh lpR fFf">

    <div class="row justify-center logo" style="height:90px" v-if="!$q.screen.gt.sm">
      <img
          src="~/assets/ironpunch.svg"
          style="position:absolute; top:-120px;"
          width="400"
        />
    </div>

    <div class="row justify-center logo" style="height:190px" v-if="$q.screen.gt.sm">
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

<style>
  .logo{
    -webkit-animation:logo-in 2.5s ease 0s 1 normal;
    -moz-animation:logo-in 2.5s ease 0s 1 normal;
    -ms-animation:logo-in 2.5s ease 0s 1 normal;
    animation:logo-in 2.5s ease 0s 1 normal;
    transition: transform 1s;
  }

  @-webkit-keyframes logo-in {
    0%{ opacity: 0; margin-top:-25%; -webkit-transform: scale(1.0); transform: scale(1.0); }
    50%{ opacity: 1; -webkit-transform: scale(1.0); transform: scale(1.0); }
    70%{ -webkit-transform: scale(1); transform: scale(1); }
    100%{ -webkit-transform: scale(1); transform: scale(1); }
  }

  @keyframes logo-in {
    0%{ opacity: 0; margin-top:-25%; transform: scale(1.0); }
    50%{ opacity: 1; transform: scale(1.0); }
    70%{ transform: scale(1); }
    100%{ transform: scale(1); }
  }
</style>
