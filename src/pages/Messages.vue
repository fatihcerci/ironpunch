<template>
  <div class="bg-grey-3" :style="style">
    <q-layout view="lHh Lpr lFf" class="shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-secondary">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <span class="q-subtitle-1 font-18" v-if="currentConversation && currentConversationIndex != -1">
            {{ currentConversation.referansNo }}
          </span>

          <q-space/>

          <q-btn round flat v-if="currentConversation && currentConversationIndex != -1 && currentConversation.oidHsrDosya">
            <q-icon name="search" @click="openRelationalVehicle()">
              <q-tooltip v-if="$q.screen.gt.sm"> 
                Konuşmanın ilişkili olduğu aracı görmek için tıklayın
              </q-tooltip>
            </q-icon>
          </q-btn>

        </q-toolbar>
      </q-header>

      <q-drawer
        class="bg-secondary"
        v-model="leftDrawerOpen"
        show-if-above
        :breakpoint="690"
      >
        <q-toolbar class="bg-secondary text-white">
          <span class="font-16 q-pl-xs">
            Mesajlarım
          </span>

          <q-space />

          <q-btn
            round
            flat
            style="font-size:11px"
            icon="edit"
            class="WAL__drawer-close"
            @click="prompt = true; newMessage = ''"
          />

          <q-btn
            v-if="!$q.screen.gt.sm"
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px); overflow-y:hidden !important" class="scrollmsg bg-secondary text-white">

          <q-list v-if="!conversations">
            <q-item 
              clickable
              v-ripple
              @click="prompt = true; newMessage = ''"
            >

              <q-item-section>
                <q-item-label lines="1">
                 Yeni mesaj oluşturmak için tıklayın..
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>


          <q-list v-if="conversations">
            <q-item 
              v-for="(conversation, index) in conversations"
              :key="conversation.oid"
              clickable
              v-ripple
              @click="setCurrentConversation(index)"
            >
            
            <!--
              <q-item-section avatar>
                <q-avatar>
                  <img :src="conversation.avatar">
                </q-avatar>
              </q-item-section>
            -->

              <q-item-section v-if="conversation.cevaplandi && !conversation.goruldu">
                <q-item-label lines="1" class="text-bold">
                  {{ conversation.referansNo }}
                </q-item-label>
                <q-item-label class="conversation__summary text-white text-bold" caption>
                  {{ conversation.sonMesaj }}
                </q-item-label>

                <q-item-label caption class="text-white text-bold">
                  {{ conversation.lastUpdatedStr }}
                </q-item-label>

              </q-item-section>

              <q-item-section v-else>
                <q-item-label lines="1">
                  {{ conversation.referansNo }}
                </q-item-label>
                <q-item-label class="conversation__summary text-white" caption>
                  {{ conversation.sonMesaj }}
                </q-item-label>

                <q-item-label caption class="text-white">
                  {{ conversation.lastUpdatedStr }}
                </q-item-label>

              </q-item-section>



              <q-item-section side>
                <q-item-label caption class="text-white">
                
                </q-item-label>

                <q-icon name="done" v-if="!conversation.cevaplandi" >
                  <q-tooltip>
                    Gönderildi
                  </q-tooltip>
                </q-icon>

                <q-icon name="done_all" color="primary" v-if="conversation.cevaplandi" > 
                  <q-tooltip>
                    Cevaplandı
                  </q-tooltip>
                </q-icon>

              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="">
        
        <div class="q-pa-md row justify-center items-center" v-if="currentConversationIndex == -1">
          <div class="row justify-center col-md-12">
            <h3 class="text-bold"> Mesajlarım</h3>
          </div>

          

          <div class="row justify-center" >
            <img src="~/assets/welcome_chat.svg" style="width:80%" />
          </div>
        </div>

        <div class="q-pa-md row " v-if="currentConversationIndex != -1">
          <div style="width: 100%; max-width: 100%"  v-for="(conversation) in currentConversation.mesajlar" :key="conversation.oid">
            
            <q-chat-message v-if="conversation.soru"
              class="q-pt-sm"
              bg-color="grey-9"
              text-color="white"
              :text="addToArray(conversation.soru)"
              :stamp="conversation.soruTarihiStr"
              sent
            />
            <q-chat-message v-if="conversation.cevap"
              class="q-pt-sm"
              :text="addToArray(conversation.cevap)"
              bg-color="primary"
              text-color="white"
              :stamp="conversation.cevapTarihiStr"
            />
          </div>

          

        </div>

        

        
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-secondary row q-pt-sm q-pb-sm" v-if="currentConversation && currentConversation.talepDurumu">
          <q-input 
            rounded 
            outlined 
            dense 
            autofocus
            class="WAL__field col-grow q-mr-sm" 
            bg-color="white" 
            color="white" 
            v-model="message" 
            maxlength="1024"
            v-on:keyup.enter="sendMessage" 
            placeholder="Mesajınızı yazın.." />
          <q-btn round flat icon="send" class="text-white" @click="sendMessage" />
        </q-toolbar>

        <q-toolbar class="bg-secondary row q-pt-sm q-pb-sm" v-else-if="currentConversation && !currentConversation.talepDurumu">
          <q-input 
            rounded 
            outlined 
            disable
            dense 
            class="WAL__field col-grow q-mr-sm" 
            bg-color="white" 
            color="white" 
            v-model="message" 
            maxlength="1024"
            placeholder="Talep kapatıldığı için yeni mesaj gönderilemez" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>


  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 30vw;">

      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Yeni Mesaj</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <q-input 
          autogrow
          outlined 
          autofocus 
          clearable
          v-model="newMessage"
          maxlength="1024"
          label="Mesaj" stack-label
          :rules="[(val) => !!val || 'Lütfen mesajınızı giriniz']"  />
      </q-card-section>

      <q-card-actions class="q-pt-none q-pl-md q-pr-md justify-center no-wrap">
        <q-btn 
          style="width: 50%"
          color="primary" 
          label="Gönder"
          @click="sendNewMessage()" 
          />

          <q-btn 
          style="width: 50%"
          label="Temizle" 
          color="secondary"
          @click="message = ''" />
      </q-card-actions>

    </q-card>
  </q-dialog>



  <q-dialog v-model="vehicleCard">
    <q-card class="my-card">
      <img :src="vehicle.onizlemeOrj" />

      <q-list dense>
        <q-item>
          <q-item-section>
            <q-item-label>İhale No</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-item-label >{{ vehicle.ihaleNo }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>İhale Başlangıç Tarihi</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-item-label >{{ vehicle.ihaleBaslangicTarihiStr }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>İhale Bitiş Tarihi</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-item-label >{{ vehicle.ihaleBitisTarihiStr }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Marka</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-item-label >{{ vehicle.marka }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Model</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-item-label >{{ vehicle.model }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Yıl</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-item-label >{{ vehicle.yil }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label>Branş</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-item-label >{{ vehicle.brans }}</q-item-label>
          </q-item-section>
        </q-item>


      </q-list>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Kapat" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page-sticky position="bottom-left" :offset="[13, 18]" v-if="$q.screen.gt.sm">
    <q-btn glossy color="primary" icon="keyboard_arrow_left" label="GERİ DÖN" @click="goHome()" />
    &nbsp;
    <q-btn glossy color="primary" icon="mail" label="YENİ MESAJ" @click="prompt = true; newMessage = ''" />
  </q-page-sticky>

</template>

<script>
import { useQuasar, scroll } from 'quasar'
import { ref, toRefs, reactive, computed, asyncComputed, onMounted, onBeforeMount } from 'vue'
import usersService from "../services/usersService"
import apiService from "../services/apiService"
import { useRouter } from "vue-router"
import messageController from "../controllers/messageController"
import { Api } from "../helpers/api"
import notify from "../helpers/notification"

export default {
  name: 'Messages',
  setup () {
    const hasUser = usersService().hasUser()
    const router = useRouter()
    const $q = useQuasar()
    const leftDrawerOpen = ref(true)
    const search = ref('')

    const state = reactive({
      message : "",
      newMessage : "",
      prompt : false,
      currentConversationIndex : -1,
      vehicleCard : false
    })
    
    const { dataList, displayError, displayMessages, fetch } = apiService()
    const { messageList, unreadMessageCount } = messageController()

    const { setVerticalScrollPosition } = scroll

    const vehicleDetail = ref()

    const vehicle = computed(() => {
      return vehicleDetail.value ? vehicleDetail.value : null
    })

    onMounted(async () => {
      if(!hasUser) {
        router.replace("/")
      }

      let el = document.getElementsByClassName("scroll")[0]
      setVerticalScrollPosition (el, 999999999, 500)
    })

    const conversations = computed(() => {
      console.log(messageList.value)
      return messageList.value && messageList.value.length > 0
        ? messageList.value.map((item) => ({
            ...item,
          }))
        : false
    })

    const currentConversation = computed(() => {
      if(!messageList.value) {
        router.replace("/")
      } else {
        const conversation = messageList.value && messageList.value.length > 0
          ? messageList.value.map((item) => ({
              ...item,
            })) : []

        if(state.currentConversationIndex == -1) {
          return false
        }
        return conversation[ state.currentConversationIndex ]
      }
      return false
    })

    const style = computed(() => ({
      height: $q.screen.height - 80 + 'px'
    }))
    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    function setCurrentConversation (index) {
      state.currentConversationIndex = index
      state.message = ""

      let el = document.getElementsByClassName("scroll")[0]
      setVerticalScrollPosition (el, 999999999, 500)

      if(!$q.screen.gt.sm) {
        toggleLeftDrawer()
      }
      
      checkAsSeen()
    }

    function addToArray (msg) {
      let array = []
      array.push(msg)
      return array
    }

    const sendMessage = async () => {
      try {
        const bodyData = {
          oidPertBilgiTalep : currentConversation.value.oid,
          oidHsrDosya : null,
          soru : state.message,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.SEND_MESSAGE, bodyData, false)
        if (displayError.value) throw new Error(displayMessages.value[0].text)

        state.message = ""
        getMessages()
      } catch (e) {
        notify().error(e.message)
      }
      
    }

    const getMessages = async () => {
      try {
        const bodyData = {
          oidHsrDosya : null,
          ihaleHakkinda : false,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.LIST_MESSAGES, bodyData, false)
        if (displayError.value) throw new Error(displayMessages.value[0].text)

        messageList.value = dataList.value
        setCurrentConversation(0)


        if(!$q.screen.gt.sm) {
          toggleLeftDrawer()
        }
      } catch (e) {
        notify().error(e.message)
        router.replace("/")
      }
    }

    const sendNewMessage = async () => {
      try {
        const bodyData = {
          oidPertBilgiTalep : null,
          oidHsrDosya : null,
          soru : state.newMessage,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.SEND_MESSAGE, bodyData, false)
        if (displayError.value) throw new Error(displayMessages.value[0].text)

        state.prompt = false
        getMessages()
      } catch (e) {
        notify().error(e.message)
      }
      
    }

    const checkAsSeen = async () => {
      try {
        const bodyData = {
          oidPertBilgiTalep : currentConversation.value.oid,
          oidHsrDosya : null,
          ihaleHakkinda : false,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.CHECK_AS_SEEN, bodyData, false)
        if (displayError.value) throw new Error(displayMessages.value[0].text)


        if(!currentConversation.value.goruldu && currentConversation.value.cevaplandi) {
          unreadMessageCount.value--
          messageList.value[state.currentConversationIndex].goruldu = true
        }
      } catch (e) {
        notify().error(e.message)
      }
      
    }

    const openRelationalVehicle = async () => {
      if(!currentConversation.value.oidHsrDosya) {
        notify().info("Bu konuşma herhangi bir araç hakkında değildir", "top")
        return false
      } 
      try {
        const bodyData = {
          oidHsrDosya : currentConversation.value.oidHsrDosya,
          serviceUrl : Api.Base.ServiceURL
        }
        await fetch(Api.Message.GET_RELATIONAL_VEHICLE, bodyData, true)
        if (displayError.value) throw new Error(displayMessages.value[0].text)

        if(!dataList.value) throw new Error("İlgili konuşmayla ilişkili araca ait ihale bilgileri bulunamadı")

        vehicleDetail.value = dataList.value
        state.vehicleCard = true
      } catch (e) {
        notify().error(e.message)
      }
    }

    const goHome = () => {
      router.push("/")
      //router.replace("/")
    }

    return {
      router,
      leftDrawerOpen,
      search,
      ...toRefs(state),
      conversations,
      currentConversation,
      messageList, 
      vehicleDetail,
      vehicle,
      setVerticalScrollPosition,
      setCurrentConversation,
      style,
      toggleLeftDrawer,
      addToArray,
      sendMessage,
      getMessages,
      sendNewMessage,
      checkAsSeen,
      openRelationalVehicle,
      goHome
    }
  }
}
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>

<style lang="css"> 
  .scroll::-webkit-scrollbar{
		width:0px;
	}

  .absolute-full {
    right: 0px !important;
  }
  .absolute-full > .scroll{
    width: 100% !important;
    right: 0px !important;
  }
</style>