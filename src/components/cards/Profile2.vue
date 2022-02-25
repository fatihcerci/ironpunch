<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="bg-secondary text-white" style="width:100%" flat>
      <q-img
        :src="profileImage"
      />

      <q-card-section>
        <div class="text-h5 text-center text-primary">
          {{ nick }}
        </div>

        <div class="text-h6 text-grey-5 text-center q-mt-sm q-mb-xs">{{ name }}</div>
        <div class="text-h7 text-grey-5 text-center q-mb-xs">{{ age }} years old</div>
        <div class="font-16 text-grey-5 text-center q-mb-xs"> <q-icon name="location_on" style="margin-bottom:2px;" />  {{ location }}  </div>

        <!--
          <div class="text-caption text-grey text-center">
            <q-avatar size="24px">
              <img src="~/assets/flags/turkey.png" />
            </q-avatar>
          </div>
        -->

      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="q-gutter-x-sm text-center">

            <q-btn size="sm" round v-if="socialMediaLinks.facebook" @click="openLink(socialMediaLinks.facebook)">
              <q-avatar rounded class="cursor-pointer" size="24px" >
                <img src="~/assets/social-media-icons/facebook.png" />
              </q-avatar>
            </q-btn>

            <q-btn size="sm" round v-if="socialMediaLinks.instagram" @click="openLink(socialMediaLinks.instagram)">
              <q-avatar rounded class="cursor-pointer" size="24px" >
                <img src="~/assets/social-media-icons/instagram.png" />
              </q-avatar>
            </q-btn>

            <q-btn size="sm" round v-if="socialMediaLinks.twitter" @click="openLink(socialMediaLinks.twitter)">
              <q-avatar rounded class="cursor-pointer" size="24px" >
                <img src="~/assets/social-media-icons/twitter.png" />
              </q-avatar>
            </q-btn>

            <q-btn size="sm" round v-if="socialMediaLinks.twitch" @click="openLink(socialMediaLinks.twitch)">
              <q-avatar rounded class="cursor-pointer" size="24px" >
                <img src="~/assets/social-media-icons/twitch.png" />
              </q-avatar>
            </q-btn>

            <q-btn size="sm" round v-if="socialMediaLinks.steam" @click="openLink(socialMediaLinks.steam)">
              <q-avatar rounded class="cursor-pointer" size="24px" >
                <img src="~/assets/social-media-icons/steam.png" />
              </q-avatar>
            </q-btn>

        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="row justify-center items-center">
          <q-btn outline color="primary" icon="settings" label="SETTINGS" style="font-size: 0.8rem; " @click="goSettings()" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <q-btn outline color="primary" icon="leaderboard" label="STATS" style="font-size: 0.8rem; " @click="goStats()" />
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue"
import { useRouter } from "vue-router"
import playerController from "../../controllers/playerController"
import apiService from "../../services/apiService"

export default defineComponent({
  name: "Profile2",

  setup() {

    const router = useRouter()

    const playerconfig = reactive({
      profileImage : "h1k0BW.png",
      nick : "H1k0.GqL",
      faceitNick : "H1k0-GqL",
      name : "Hikmet Gül",
      age : "26",
      location : "Sivas / Turkey",
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      socialMediaLinks : {
        facebook : "https://facebook.com",
        instagram : "https://instagram.com",
        twitter : null,
        twitch : null,
        steam : "https://discord.gg/"
      },
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

    const { playerInfo, player, playerStats, playerMapStats } = playerController()
    const { faceitPlayerSearch, faceitPlayer, faceitPlayerStats, faceitPlayerMapStats, searchPlayer, getPlayer, getPlayerStats } = apiService()

    const goSettings = () => {
      playerInfo.value = playerconfig
      router.push(`/settings`)
    }

    const goStats = async () => {
      playerInfo.value = playerconfig

      await searchPlayer(playerInfo.value.faceitNick)

      await getPlayer(faceitPlayerSearch.value.player_id)
      player.value = faceitPlayer.value

      await getPlayerStats(faceitPlayer.value.player_id)
      playerStats.value = faceitPlayerStats.value
      playerMapStats.value = faceitPlayerMapStats.value

      router.push(`/stats`)
    }

    const openLink = (link) => {
      window.open(
        link,
        '_blank'
      )
    }

    return {
      router,
      playerInfo,
      player,
      playerStats,
      playerMapStats,
      faceitPlayerSearch,
      faceitPlayer,
      faceitPlayerStats,
      faceitPlayerMapStats,
      ...toRefs(playerconfig),
      goSettings,
      goStats,
      openLink,
      searchPlayer,
      getPlayer,
      getPlayerStats
    }
  },
})
</script>
