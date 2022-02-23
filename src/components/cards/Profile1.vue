<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="bg-secondary text-white" flat>
      <q-img
        src="~/assets/profile-images/ppnotfound.jpg"
      />

      <q-card-section>
        <div class="text-h5 text-center text-primary">
          {{ nick }}
        </div>
        
        <div class="text-h6 q-mt-sm q-mb-xs">{{ name }}</div>
        <div class="text-h7 q-mb-xs">{{ age }} years old</div>
        <div class="text-caption text-grey">
          {{ description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="q-gutter-x-sm text-center">

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/facebook.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/instagram.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/youtube.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/twitch.png" />
            </q-avatar>

            <q-avatar rounded class="cursor-pointer" size="24px">
              <img src="~/assets/social-media-icons/discord.png" />
            </q-avatar>

        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="row justify-center items-center">
          <q-btn outline color="primary" icon="settings" label="SETTINGS" style="font-size: 0.8rem; width:47%;" @click="goSettings()" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <q-btn outline color="primary" icon="leaderboard" label="STATS" style="font-size: 0.8rem; width:47%;" />
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import settingsController from "../../controllers/settingsController"

export default defineComponent({
  name: "Profile1",

  setup() {

    const router = useRouter()

    const player = reactive({
      nick : "ch3rcy",
      name : "Fatih Çerçi",
      age : "26",
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      profile_image : "../assets/profile-images/ppnotfound.jpg",

      settings : {
        mouseSettings : {
          mouse : "BENQ ZOWIE FK1",
          dpi : "400",
          sensitivity : "1.6",
          rawInput : "Off",
          hz : "1000",
          zoomSensitivity : "1.00",
          windowsSensitivity : "6/11",
          mouseAcceleration :  "On"
        },
        monitorSettings : {
          monitor : 'ASUS V278QR 27" 165Hz',
          resolution : "1280x960",
          aspectRatio : "4:3",
          scalingMode : "Stretched",
          hz : "165"
        },
        crosshair : "cl_crosshaircolor 0; cl_crosshair_size 3; cl_crosshairgap 0;",
        viewmodel : "viewmodel_fov 60; viewmodel_offset_x 1; viewmodel_offset_y 1; viewmodel_offset_z -1; viewmodel_presetpos 0; viewmodel_recoil 1; cl_righthand 0;",
        bob : "cl_bob_lower_amt 21; cl_bobamt_lat 0.33; cl_bobamt_vert 0.14; cl_bobcycle 0.8;",
        launchOptions : "-refresh 165 -console -novid -tickrate 128 -noforcemaccel -noforcemparms -noforcemspd",

        configUrl : "https://mediafire.com/"
      }
    })

    const { playerInfo } = settingsController()

    const goSettings = () => {
      console.log(player)
      playerInfo.value = player 
      router.push(`/settings`)
    }

    return {
      router,
      ...toRefs(player),
      goSettings,
    }
  },
})
</script>
