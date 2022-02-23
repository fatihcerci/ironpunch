<template>
  <list-tender-info />
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import claimController from "../controllers/claimController"
import apiService from "../services/apiService"

export default {
  name: "Detail",
  components: {
    ListTenderInfo: defineAsyncComponent(() =>
      import("src/components/lists/ListTenderInfo.vue")
    )
  },

  setup() {
    const { dataList, displayError, displayMessages, fetch } = apiService()
    const router = useRouter()
    const { claimDetail, selectedClaim } = claimController()

    onMounted(async () => {
      if(!claimDetail.value) {
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
