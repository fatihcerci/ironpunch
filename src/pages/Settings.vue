<template>
  <player-settings />
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import playerController from "../controllers/playerController"

export default {
  name: "Settings",
  components: {
    PlayerSettings: defineAsyncComponent(() =>
      import("src/components/lists/PlayerSettings.vue")
    )
  },

  setup() {
    const router = useRouter()
    const { playerInfo } = playerController()

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
