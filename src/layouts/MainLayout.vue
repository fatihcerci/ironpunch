<template>
  <q-layout view="lHh Lpr lFf" class="bg-sompo-dark">
    <q-header elevated class="text-white bg-primary" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">

        <q-btn rounded flat v-if="!$q.screen.gt.sm && !isHome()" icon="home" @click="goHome" style="font-size:16px" class="q-pa-none" />
        <q-space v-if="!$q.screen.gt.sm && !isHome()" />

        <img
          src="~/assets/sompo-sigorta-white.svg"
          width="200"
          class="q-mr-sm q-pl-md cursor-pointer"
          @click="goHome"
        />

        <q-space />
        
        <h6 v-if="$q.screen.gt.sm" class="text-white q-my-md q-px-sm">İhale Yöntemi ile Araç Satış Sistemi</h6>

        <q-space />

        <div class="q-gutter-xs row items-center no-wrap">
          <q-btn v-if="!hasUser && !$q.screen.gt.sm" flat round dense icon="menu">
            <q-menu :style="{ backgroundColor: '#eee', color: 'black'}">
              <q-list style="min-width: 170px">
                <q-item clickable @click="goLoginPage">
                  <q-item-section avatar style="min-width: 20px"> 
                    <q-icon color="primary" name="account_circle" />
                  </q-item-section>
                  <q-item-section>Giriş Yap</q-item-section>
                </q-item>
                <q-item  clickable @click="goAppealPage">
                  <q-item-section avatar style="min-width: 20px">
                    <q-icon color="primary" name="note_add" />
                  </q-item-section>
                  <q-item-section>Yeni Başvuru</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn v-if="!hasUser && $q.screen.gt.sm" glossy icon="account_circle" class="text-capitalize" label="Giriş Yap" @click="goLoginPage()" />
          <q-btn v-if="!hasUser && $q.screen.gt.sm" glossy icon="note_add" class="text-capitalize" label="Yeni Başvuru" @click="goAppealPage()" />


          <!-- <q-btn v-if="hasUser" glossy icon="help" class="text-capitalize" label="Soru Sor" @click="goAppealPage()" />  -->

          
          <!-- 
          <q-btn v-if="hasUser" flat dense no-wrap style="font-size:18px;"  icon="mail" @click="goMessages()">
            <q-badge color="secondary" floating transparent>
              {{ getUnreadMessageCount }}
            </q-badge>
          </q-btn>
          -->
          
          <q-btn v-if="hasUser" dense flat no-wrap>
            
            <q-badge color="secondary" floating>
              {{ getUnreadMessageCount }}
            </q-badge>

            <q-avatar rounded size="32px">
              <img :src="avatar" />
            </q-avatar>

            <q-icon name="arrow_drop_down" size="16px" />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div class="text-capitalize">
                      <strong>{{ userName }}</strong>
                    </div>
                  </q-item-section>
                </q-item>
                
                <q-item clickable @click="goMessages">
                  <q-item-section>Mesajlarım ({{ getUnreadMessageCount }}) </q-item-section>
                </q-item>

                <q-item clickable class="GL__menu-link" @click="doLogout">
                  <q-item-section>Çıkış</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          

          <!--
          <q-btn v-if="$q.screen.gt.xs && hasUser" rounded glossy no-wrap id="username">

            <q-icon name="account_circle"/>

            <q-menu style="min-width: 170px" auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div class="text-capitalize">
                      <strong>{{ userName }}</strong>
                    </div>
                  </q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" @click="doLogout">
                  <q-item-section>Çıkış Yap</q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            &nbsp;&nbsp; {{ userName }}

            <q-icon name="arrow_drop_down" size="24px" />
          </q-btn>

          --> 
        </div>
      </q-toolbar>
    </q-header>
      
    <q-page-container>
      <router-view />
    </q-page-container>

    <!--
    <q-footer>
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="row justify-center items-center">
          <div class="font-11">LENORA Bilişim Teknolojileri © 2022 Tüm Hakları Saklıdır</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    -->
    
  </q-layout>
</template>

<script>
import { defineAsyncComponent, ref, computed, onMounted, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import usersService from "../services/usersService"
import apiService from "../services/apiService"
import menuController from "../controllers/menuController"
import claimController from "../controllers/claimController"
import { Api } from "../helpers/api"
import notify from "../helpers/notification"
import { Format } from "../helpers/format"
import messageController from "../controllers/messageController"

export default {
  name: "MainLayout",
  components: {
  },
  setup() {
    const { claimDataSource, claimList, dataList, displayError, displayMessages, fetch } = apiService()
    const { logout } = usersService()
    const { menuList, showSearchInput } = menuController()
    const { resetSelectedClaim } = claimController()
    const router = useRouter()
    const search = ref("")
    const leftDrawerOpen = ref(false)
    let isRemoved = false

    const state = reactive({
      prompt : false,
      soru : "",
    })

    onMounted(async () => {
      
    })

    const hasUser = usersService().hasUser()

    const userName = computed(() => {
      const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"))
      if(sessionInfo) {
        return (sessionInfo.userName.toLocaleLowerCase('tr-TR'))
      }
      return ""
    })

    const avatar = computed(() => {
      const sessionInfo = JSON.parse(localStorage.getItem("sessionInfo"))
      if(sessionInfo) {
        return (
          "https://ui-avatars.com/api/?format=svg&background=fff&color=b61738&name=" +
          sessionInfo.userName
        )
      }
      return ("")
    })


    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const doLogout = async () => {
      await logout()
      location.reload()
    }

    const goLoginPage = async () => {
      router.push("/auth")
      //router.replace("/auth")
    }

    const goAppealPage = () => {
      window.open(
        Api.Base.AppealURL,
        '_blank'
      )
    }

    const goHome = () => {
      router.replace("/")
    }

    const isHome = () => {
      return router.currentRoute.value.path === "/" ? true : false
    }

    const removeLink = (index) => {
      resetSelectedClaim()
      menuList.value.splice(index, 1)
      showSearchInput.value = true
      router.replace(`/`)
      isRemoved = true
    }

    const showHome = (to) => {
      if (to === "/") {
        showSearchInput.value = true
        isRemoved = false
      } else {
        if (!isRemoved) {
          showSearchInput.value = false
        }
      }
    }

    const searchInputEnterClicked = () => {
      if (search.value.length > 0) {
        if (search.value.startsWith("Dosya Nu:")) {
          search.value = search.value.substring(9, search.value.length).trim()
        }
        claimDataSource.value = claimList.value.otoDisiDisEksperViewList.filter(
          (item) =>
            search.value.length > 0 &&
            item.dosyaNo.toString().indexOf(search.value) > -1
        )
      } else {
        claimDataSource.value = claimList.value.otoDisiDisEksperViewList
      }
    }

    const searchTextTransform = (value) => {
      if (value.length > 2) {
        search.value = value.startsWith("Dosya Nu: ")
          ? value
          : value.toLowerCase().startsWith("dos")
          ? "Dosya Nu: "
          : value
      }
    }

    const { messageList, unreadMessageCount } = messageController()

    const getUnreadMessageCount = computed(() => {
      return unreadMessageCount.value
    })

    const fetchUnreadMessageCount = async () => {
      if(hasUser) {
        try {
          const bodyData = {
            serviceUrl : Api.Base.ServiceURL
          }
          await fetch(Api.Message.GET_UNREAD_MESSAGE_COUNT, bodyData)
          if (dataList.value) {
            unreadMessageCount.value = dataList.value
          }
          if (displayError.value) throw new Error(displayMessages.value[0].text)
        } catch (e) {
          notify().error(e.message)
        }
      }
    }

    fetchUnreadMessageCount()

    //setInterval(fetchUnreadMessageCount, Format.Time.ONE_MINUTE)

    const goMessages = async () => {
      await fetchUnreadMessageCount()
      await getMessages()
      if (dataList.value) messageList.value = dataList.value
      router.push("/messages")
      //router.replace("/messages")
    }

    const getMessages = async () => {
      try {
        const bodyData = {
          oidHsrDosya : null,
          ihaleHakkinda : false,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.LIST_MESSAGES, bodyData)
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        notify().error(e.message)
        router.replace("/")
      }
    }

    return {
      dataList, 
      displayError, 
      displayMessages,
      search,
      ...toRefs(state),
      avatar,
      userName,
      router,
      menuList,
      showSearchInput,
      fetch,
      goHome,
      isHome,
      leftDrawerOpen,
      toggleLeftDrawer,
      doLogout,
      goLoginPage,
      goAppealPage,
      removeLink,
      showHome,
      searchInputEnterClicked,
      searchTextTransform,
      resetSelectedClaim,
      hasUser,
      goMessages,
      messageList, 
      getMessages,
      fetchUnreadMessageCount,
      getUnreadMessageCount
    }
  },
}
</script>

<style lang="css">
.search-input {
  width: 50%;
}
.search-menu {
  max-width: 100% !important;
  margin: 0px 16px 16px 16px !important;
}
.display-none{
  display: none;
}
</style>
