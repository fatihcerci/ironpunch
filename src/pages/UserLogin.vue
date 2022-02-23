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
                <q-item  clickable @click="goAppealPage()" >
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
          <img src="~/assets/login2.svg" class="img-fluid" />
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
                <h4 class="text-primary text-bold q-my-md q-px-sm">İhale Yöntemi ile Araç Satış Sistemi</h4>

              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm">
                  <q-input
                    v-on:keyup.enter="doLogin"
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
                  <q-input
                    v-on:keyup.enter="doLogin"
                    ref="password"
                    square
                    clearable
                    v-model="creds.password"
                    :type="passwordFieldType"
                    label="Şifre"
                    :rules="[(val) => !!val || 'Şifre zorunlu alandır']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>


                  <div class="row q-pb-md q-col-gutter-md" >
                    <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12 module">
                      <q-input
                        v-on:keyup.enter="doLogin"
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
                  @click="doLogin"
                  class="full-width text-white text-capitalize"
                  label="Giriş Yap"
                />
              </q-card-actions>

              

            </q-card>
            <q-card-actions v-if="$q.screen.gt.md">
                <a href="javascript:void(0)" class="text-white font-18" @click="goHome()"> Ana Sayfa </a>
                <span class="text-white font-16">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                <a href="javascript:void(0)" class="text-white font-18" @click="goForgotPassword()"> Şifremi Unuttum</a>
            </q-card-actions>

            <q-card-actions v-if="!$q.screen.gt.md" class="no-wrap items-center">
              <a href="javascript:void(0)" class="text-red text-bold font-16"  @click="goForgotPassword()"> Şifremi Unuttum</a>
            </q-card-actions>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue"
//import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import usersService from "../services/usersService"
import notify from "../helpers/notification"
import { Api } from "../helpers/api"

export default defineComponent({
  name: "UserLogin",
  setup() {
    const router = useRouter()
    //const $q = useQuasar()
    const { login, logout, hasUser, sessionInfo, displayError, displayMessages } =
      usersService()
    const passwordFieldType = ref("password")
    const visibility = ref(false)
    const visibilityIcon = ref("visibility")
    const creds = ref({
      userCode: "",
      password: "",
      captcha: ""
    })

    const url = ref(Api.Base.ServiceURL + '/../simpleCaptcha.png?v='+Math.random())

    const doLogin = async () => {
      try {
        const { userCode, password, captcha } = creds.value
        await login(userCode, password, captcha)
        if (sessionInfo.value) {
          localStorage.setItem(
            "sessionInfo",
            sessionInfo.value.extra.sessionInfo
          )
          localStorage.setItem("expertCode", userCode)
          router.replace("/")
        } else {
          await logout()
          router.replace("/auth")
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        refresh()
        notify().error(e.message)
        router.replace("/auth")
      }
    }

    const switchVisibility = () => {
      visibility.value = !visibility.value
      passwordFieldType.value = visibility.value ? "text" : "password"
      visibilityIcon.value = visibility.value ? "visibility_off" : "visibility"
    }

    const goHome = () => {
      router.push("/")
      //router.replace("/")
    }

    const goForgotPassword = () => {
      router.push("/forgetpassword")
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
      router,
      passwordFieldType,
      visibility,
      visibilityIcon,
      creds,
      goHome,
      goForgotPassword,
      doLogin,
      switchVisibility,
      url,
      refresh,
      goAppealPage
    }
  },
})
</script>
