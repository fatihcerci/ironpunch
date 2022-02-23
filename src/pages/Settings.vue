<template>
  <player-settings />
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import settingsController from "../controllers/settingsController"

export default {
  name: "Settings",
  components: {
    PlayerSettings: defineAsyncComponent(() =>
      import("src/components/lists/PlayerSettings.vue")
    )
  },

  setup() {
    const router = useRouter()
    const { playerInfo } = settingsController()

    onMounted(async () => {
      if(!playerInfo.value) {
        router.replace("/")
      }
    })
    
    return {

    }
  },
}
</script>

<style>

.q-carousel__navigation--bottom{overflow:hidden !important}

</style>
