<template>
  <q-page q-layout view="hHh lpR fFf">
    <table-claims />
  </q-page>
</template>

<script>
import { defineAsyncComponent, onMounted } from "vue"
import { useRouter } from "vue-router"
import apiService from "../services/apiService"
import notify from "../helpers/notification"
import usersService from "../services/usersService"
import messageController from "../controllers/messageController"

export default {
  name: "Home",
  components: {
    TableClaims: defineAsyncComponent(() =>
      import("src/components/tables/TableClaims.vue")
    )
  },

  setup() {
    const { displayError, displayMessages, fetchExpertClaimData } = apiService()
    const { hasSession, sessionInfo, login } = usersService()

    onMounted(async () => {
      try {
        if(!hasSession()) {
          await login("INTERNET_USER", null)
          if (sessionInfo.value) {
            localStorage.setItem(
              "sessionInfo",
              sessionInfo.value.extra.sessionInfo
            )
          }
        }
        await fetchExpertClaimData()
        if(displayError.value){ 
          if(displayMessages.value[0].text.includes("Oturum bulunamadı")) {
            localStorage.clear()
            await login("INTERNET_USER", null)
            if (sessionInfo.value) {
              localStorage.setItem(
                "sessionInfo",
                sessionInfo.value.extra.sessionInfo
              )
              await fetchExpertClaimData()
            }
          } else {
            throw new Error(displayMessages.value[0].text)
          }
        } 
        
      } catch (e) {
        if(e.message.includes("Network Error")) {
          notify().error("Sunucuya erişilemiyor. Lütfen daha sonra tekrar deneyiniz")
        } else {
          notify().error(e.message)
        }
        //router.replace("/auth")
      }
    })


    return {
      displayError,
      displayMessages,
      hasSession,
      fetchExpertClaimData,
    }
  },
}
</script>
