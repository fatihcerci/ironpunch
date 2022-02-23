<template>
  <div class="row q-pb-md q-col-gutter-md" >
    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-white">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="bg-secondary text-white" flat>
          <q-img
            src="~/assets/profile-images/ppnotfound.jpg"
          />

          <q-card-section>
            <div class="text-h5 text-center text-primary">
              {{ playerInfo.nick }}
            </div>
            
            <div class="text-h6 q-mt-sm q-mb-xs">{{ playerInfo.name }}</div>
            <div class="text-h7 q-mb-xs">{{ playerInfo.age }} years old</div>
            <div class="text-caption text-grey">
              {{ playerInfo.description }}
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
              <q-btn glossy class="full-width" color="primary" icon="download" label="DOWNLOAD CONFIG / CFG" @click="downloadConfig()" />
          </q-card-section>

        </q-card>
      </div>

    </div>


    <div class="col-lg-9 col-md-3 col-sm-12 col-xs-12 text-white">
        <q-list class="bg-card no-border q-mt-md">
          <q-expansion-item
            :label="'MOUSE SETTINGS - ' + playerInfo.settings.mouseSettings.mouse"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-transparent no-shadow no-border">
              <q-card-section class="">
                <div class="row" >
                  
                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-pb-md q-col-gutter-md" >
                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> DPI </div>
                        <div class="font-16"> {{ playerInfo.settings.mouseSettings.dpi }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Sensitivity </div>
                        <div class="font-16"> {{ playerInfo.settings.mouseSettings.sensitivity }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Raw Input </div>
                        <div class="font-16"> {{ playerInfo.settings.mouseSettings.rawInput }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Polling Rate (Hz) </div>
                        <div class="font-16"> {{ playerInfo.settings.mouseSettings.hz }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Zoom Sensitivity </div>
                        <div class="font-16"> {{ playerInfo.settings.mouseSettings.zoomSensitivity }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Windows Sensitivity </div>
                        <div class="font-16"> {{ playerInfo.settings.mouseSettings.windowsSensitivity }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Mouse Acceleration </div>
                        <div class="font-16"> {{ playerInfo.settings.mouseSettings.mouseAcceleration }} </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>



          <q-expansion-item
            :label="'MONITOR SETTINGS - ' + playerInfo.settings.monitorSettings.monitor"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-transparent no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row" >
                  
                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-pb-md q-col-gutter-md" >

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Resolution </div>
                        <div class="font-16"> {{ playerInfo.settings.monitorSettings.resolution }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Aspect Ratio </div>
                        <div class="font-16"> {{ playerInfo.settings.monitorSettings.aspectRatio }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Scaling Mode </div>
                        <div class="font-16"> {{ playerInfo.settings.monitorSettings.scalingMode }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Refresh (Hz) </div>
                        <div class="font-16"> {{ playerInfo.settings.monitorSettings.hz }} </div>
                      </div>

                      
                      
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>


          <q-expansion-item
            label="CROSSHAIR"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-transparent no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row">
                  
                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" >
                      
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm"> {{ playerInfo.settings.crosshair }} </div>
                      
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>


          <q-expansion-item
            label="VIEWMODEL"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-transparent no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row">
                  
                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" >
                      
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm"> {{ playerInfo.settings.viewmodel }} </div>
                      
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            label="CL_BOB"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-transparent no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row">
                  
                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" >
                      
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm"> {{ playerInfo.settings.bob }} </div>
                      
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>


          <q-expansion-item
            label="LAUNCH OPTIONS"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-transparent no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row" >
                  
                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" >
                      
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm"> {{ playerInfo.settings.launchOptions }} </div>
                      
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          
        </q-list>
    </div>

  </div>
  
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn glossy color="primary" icon="keyboard_arrow_left" label="GO HOME" @click="goHome()" />
  </q-page-sticky>

  
</template>

<script>
import { useRouter } from "vue-router"
import settingsController from '../../controllers/settingsController'

export default {
  name: "PlayerSettings",
  components: {
  
  },

  setup() {
    const router = useRouter()

    const { playerInfo } = settingsController()

    const downloadConfig = () => {
      window.open(
        playerInfo.value.settings.configUrl,
        '_blank'
      )
    }

    const goHome = () => {
      router.push(`/`)
    }

    return {
      router,
      playerInfo,
      downloadConfig,
      goHome
    }
  }
  
}
</script>

<style></style>
