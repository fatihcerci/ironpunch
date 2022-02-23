<template>
  <q-page class="row">
    <q-header v-if="!$q.screen.gt.sm" elevated class="text-white bg-primary" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">

        <q-btn rounded flat v-if="!$q.screen.gt.sm" icon="home" @click="goHome" style="font-size:14px" class="q-px-sm" />
        <q-space/>
        <img
          src="~/assets/sompo-sigorta-white.svg"
          width="200"
          class="q-mr-sm q-pl-sm cursor-pointer"
          @click="goHome"
        />
        
        <q-space/>

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn flat round dense icon="menu">
            <q-menu :style="{ backgroundColor: '#eee', color: 'black'}">
              <q-list style="min-width: 170px">

                <q-item clickable @click="goLoginPage()">
                  <q-item-section avatar style="min-width: 20px"> 
                    <q-icon color="primary" name="account_circle" />
                  </q-item-section>
                  <q-item-section>Giriş Yap</q-item-section>
                </q-item>

                <q-item clickable @click="goAppealPage()">
                  <q-item-section avatar style="min-width: 20px">
                    <q-icon color="primary" name="note_add" />
                  </q-item-section>
                  <q-item-section>Yeni Başvuru</q-item-section>
                </q-item>

              </q-list>
            </q-menu>
          </q-btn>

        </div>
      </q-toolbar>
    </q-header>

    <div
      class="
        q-pa-md
        full-width
        row
        wrap
        justify-around
        items-center
        content-center
      "
    >
      <img src="~/assets/waves.svg" class="wave" v-if="$q.screen.gt.sm"/>
      <div class="row full-width" style="overflow: hidden">
        <div class="col-grow flex items-center justify-center" v-if="$q.screen.gt.sm">
          <img src="~/assets/forgot_password.svg" class="img-fluid" />
        </div>
        <div :class="$q.screen.gt.md ? 'col-4' : 'col-grow'">
          <div class="row justify-center items-center q-pa-xs">
            <q-card flat square no-border class="full-width">
              <q-card-section>
                <q-img v-if="$q.screen.gt.sm"
                  src="~/assets/sompo-sigorta-red-black.svg"
                  width="90%"
                  class="q-ml-sm q-my-lg cursor-pointer"
                  @click="goHome"
                />
                <h4 class="text-primary text-bold q-my-md q-px-sm">Şifre Sıfırlama</h4>

              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm">
                  <q-input
                    v-on:keyup.enter="doResetPassword()"
                    ref="userCode"
                    square
                    clearable
                    v-model="creds.userCode"
                    type="input"
                    label="Kullanıcı Kodu"
                    :rules="[
                      (val) => !!val || 'Kullanıcı kodu zorunlu alandır',
                    ]"
                    input-class="text-uppercase"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>

                  <div class="row q-pb-md q-col-gutter-md" >
                    <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12 module">
                      <q-input
                        v-on:keyup.enter="doResetPassword()"
                        ref="captcha"
                        square
                        clearable
                        v-model="creds.captcha"
                        type="input"
                        label="Resimdeki Metin"
                        :rules="[
                          (val) => !!val || 'Resimdeki Metin zorunlu alandır',
                        ]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="autorenew" @click="refresh()" class="cursor-pointer" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12" >
                      <q-img
                        ref="captcha"
                        square
                        clearable
                        :src="url"
                        @click="refresh()"
                      />
                    </div>
                  </div>
                  
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg justify-center">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="doResetPassword()"
                  class="full-width text-white text-capitalize"
                  label="Şifre Sıfırla"
                />
              </q-card-actions>

              

            </q-card>
            <q-card-actions v-if="$q.screen.gt.md">
                <a href="javascript:void(0)" class="text-white font-18" @click="goHome()"> Ana Sayfa </a>
                <span class="text-white font-16">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                <a href="javascript:void(0)" class="text-white font-18" @click="goLoginPage()"> Giriş Yap</a>
            </q-card-actions>

            <q-card-actions v-if="!$q.screen.gt.md" class="no-wrap items-center">
              <a href="javascript:void(0)" class="text-red text-bold font-16"  @click="goHome()"> Ana Sayfa</a>
              <span class="text-red text-bold font-16">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
              <a href="javascript:void(0)" class="text-red text-bold font-16" @click="goLoginPage()"> Giriş Yap</a>
            </q-card-actions>
          </div>
        </div>
      </div>
    </div>


    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Uyarı</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="min-width: 50vh">
          {{ getResponseMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Tamam" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { defineComponent, ref, toRefs, reactive, onMounted, computed } from "vue"
//import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import usersService from "../services/usersService"
import notify from "../helpers/notification"
import { Api } from "../helpers/api"

export default defineComponent({
  name: "UserForgetPassword",
  setup() {
    const router = useRouter()
    //const $q = useQuasar()
    const { resetPassword, hasUser, displayError, displayMessages, responseMessages } =
      usersService()
    const passwordFieldType = ref("password")
    const visibility = ref(false)
    const visibilityIcon = ref("visibility")
    const creds = ref({
      userCode: "",
      captcha: ""
    })

    const state = reactive({
      alert : false
    })

    const url = ref(Api.Base.ServiceURL + '/../simpleCaptcha.png?v='+Math.random())

    const doResetPassword = async () => {
      try {
        const { userCode, captcha } = creds.value
        await resetPassword(userCode, captcha)
        if (responseMessages.value) {
          state.alert = true
          refresh()
        } 
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        refresh()
        notify().error(e.message)
      }
    }

    const getResponseMessage = computed(() => {
      return responseMessages.value
    })

    const goHome = () => {
      router.push("/")
    }

    const goLoginPage = () => {
      router.push("/auth")
    }

    const refresh = () => {
        url.value = Api.Base.ServiceURL + '/../simpleCaptcha.png?v='+Math.random()
        creds.value.captcha = ""
    }

    onMounted(async () => {
      if(hasUser()) {
        goHome()
      }
    })

    const goAppealPage = () => {
      window.open(
        Api.Base.AppealURL,
        '_blank'
      )
    }

    return {
      ...toRefs(state),
      router,
      passwordFieldType,
      visibility,
      visibilityIcon,
      creds,
      getResponseMessage,
      goHome,
      goLoginPage,
      doResetPassword,
      url,
      refresh,
      goAppealPage
    }
  },
})
</script>
