<template>
  <player-settings />
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import playerController from "../controllers/playerController"
import apiService from "../services/apiService"

export default {
  name: "Stats",
  components: {
    PlayerSettings: defineAsyncComponent(() =>
      import("src/components/lists/PlayerStats.vue")
    )
  },

  setup() {
    const router = useRouter()
    const { playerInfo, player, playerStats } = playerController()
    const { faceitPlayer, faceitPlayerStats, getPlayer, getPlayerStats } = apiService()

    onMounted(async () => {
      if(!playerInfo.value) {
        router.replace("/")
      }
    })

    return {
      router,
      playerInfo,
      player,
      playerStats,
      faceitPlayer,
      faceitPlayerStats,
      getPlayer,
      getPlayerStats
    }
  },
}
</script>

<style>

.q-carousel__navigation--bottom{overflow:hidden !important}

</style>
