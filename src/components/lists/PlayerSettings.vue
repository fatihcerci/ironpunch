<template>
  <div class="row q-pb-md" >
    <div class="col-lg-3 q-pl-md col-md-3 col-sm-12 col-xs-12 text-white">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="bg-secondary text-white full-width" flat>
          <q-img
            :src="playerInfo.profileImage"
          />

           <q-card-section>

            <div class="text-h5 text-center text-primary">
              {{ playerInfo.nick }}
            </div>

            <div class="text-h6 text-grey-5 text-center q-mt-sm q-mb-xs">{{ playerInfo.name }}</div>
            <div class="text-h7 text-grey-5 text-center q-mb-xs">{{ playerInfo.age }} years old</div>
            <div class="font-16 text-grey-5 text-center q-mb-xs"> <q-icon name="location_on" style="margin-bottom:2px;" /> {{ playerInfo.location }} </div>

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

              <q-btn size="sm" round v-if="playerInfo.socialMediaLinks.facebook" @click="openLink(playerInfo.socialMediaLinks.facebook)">
                <q-avatar rounded class="cursor-pointer" size="24px" >
                  <img src="~/assets/social-media-icons/facebook.png" />
                </q-avatar>
              </q-btn>

              <q-btn size="sm" round v-if="playerInfo.socialMediaLinks.instagram" @click="openLink(playerInfo.socialMediaLinks.instagram)">
                <q-avatar rounded class="cursor-pointer" size="24px" >
                  <img src="~/assets/social-media-icons/instagram.png" />
                </q-avatar>
              </q-btn>

              <q-btn size="sm" round v-if="playerInfo.socialMediaLinks.twitter" @click="openLink(playerInfo.socialMediaLinks.twitter)">
                <q-avatar rounded class="cursor-pointer" size="24px" >
                  <img src="~/assets/social-media-icons/twitter.png" />
                </q-avatar>
              </q-btn>

              <q-btn size="sm" round v-if="playerInfo.socialMediaLinks.twitch" @click="openLink(playerInfo.socialMediaLinks.twitch)">
                <q-avatar rounded class="cursor-pointer" size="24px" >
                  <img src="~/assets/social-media-icons/twitch.png" />
                </q-avatar>
              </q-btn>

              <q-btn size="sm" round v-if="playerInfo.socialMediaLinks.steam" @click="openLink(playerInfo.socialMediaLinks.steam)">
                <q-avatar rounded class="cursor-pointer" size="24px" >
                  <img src="~/assets/social-media-icons/steam.png" />
                </q-avatar>
              </q-btn>

            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="row justify-center items-center">
              <q-btn glossy class="full-width" color="primary" icon="download" label="DOWNLOAD CONFIG / CFG" @click="downloadConfig()" />
          </q-card-section>

        </q-card>
      </div>

    </div>


    <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 text-white">
        <q-list class="bg-card no-border q-mt-md">
          <q-expansion-item
            :label="'MOUSE SETTINGS - ' + playerInfo.settings.mouseSettings.mouse"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-secondary no-shadow no-border">
              <q-card-section class="">
                <div class="row" >

                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-pb-md q-col-gutter-md" >
                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> DPI </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.dpi }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Sensitivity </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.sensitivity }} </div>
                      </div>

					  <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> eDPI </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.edpi }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Raw Input </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.rawInput }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Polling Rate (Hz) </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.hz }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Zoom Sensitivity </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.zoomSensitivity }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Windows Sensitivity </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.windowsSensitivity }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Mouse Acceleration </div>
                        <div class="font-18"> {{ playerInfo.settings.mouseSettings.mouseAcceleration }} </div>
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
            <q-card class="bg-secondary no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row" >

                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-pb-md q-col-gutter-md" >

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Resolution </div>
                        <div class="font-18"> {{ playerInfo.settings.monitorSettings.resolution }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Aspect Ratio </div>
                        <div class="font-18"> {{ playerInfo.settings.monitorSettings.aspectRatio }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Scaling Mode </div>
                        <div class="font-18"> {{ playerInfo.settings.monitorSettings.scalingMode }} </div>
                      </div>

                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Refresh (Hz) </div>
                        <div class="font-18"> {{ playerInfo.settings.monitorSettings.hz }} </div>
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
            <q-card class="bg-secondary no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row">

                  <div class="row col-lg-12 col-sm-12 col-xs-12 text-white">
					<q-icon name="content_copy" class="q-pt-sm cursor-pointer" color="primary" size="30px" v-if="$q.screen.gt.sm" @click="copyToClipboard('crosshair')"> <q-tooltip>Copy to Clipboard</q-tooltip>  </q-icon>
                    <div class=" q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" style="width:95%">
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm" id="crosshair"> {{ playerInfo.settings.crosshair }} </div>
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
			      <q-card class="bg-secondary no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row">

                  <div class="row col-lg-12 col-sm-12 col-xs-12 text-white">
					          <q-icon name="content_copy" class="q-pt-sm cursor-pointer" color="primary" size="30px" v-if="$q.screen.gt.sm" @click="copyToClipboard('viewmodel')"> <q-tooltip>Copy to Clipboard</q-tooltip>  </q-icon>
                    <div class="row q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" style="width:95%" >
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm" id="viewmodel"> {{ playerInfo.settings.viewmodel }} </div>
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
            <q-card class="bg-secondary no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row">

                  <div class="row col-lg-12 col-sm-12 col-xs-12 text-white">
					          <q-icon name="content_copy" class="q-pt-sm cursor-pointer" color="primary" size="30px" v-if="$q.screen.gt.sm" @click="copyToClipboard('bob')"> <q-tooltip>Copy to Clipboard</q-tooltip>  </q-icon>
                    <div class="row q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" style="width:95%" >
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm" id="bob"> {{ playerInfo.settings.bob }} </div>
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

			      <q-card class="bg-secondary no-shadow no-border">
              <q-card-section class="q-pa-md">
                <div class="row">

                  <div class="row col-lg-12 col-sm-12 col-xs-12 text-white">
					          <q-icon name="content_copy" class="q-pt-sm cursor-pointer" color="primary" size="30px" v-if="$q.screen.gt.sm" @click="copyToClipboard('launchOptions')"> <q-tooltip>Copy to Clipboard</q-tooltip>  </q-icon>
                    <div class="row q-mt-xs q-ml-xs q-mr-xs bg-sompo-dark" style="width:95%" >
                        <div class="font-16 q-pt-sm q-pb-sm q-pl-sm q-pr-sm" id="launchOptions"> {{ playerInfo.settings.launchOptions }} </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>


        </q-list>
    </div>



  </div>

  <q-page-sticky position="bottom-left" :offset="[18, 5]" style="z-index:99999999">
    <q-btn size="md" round rounded glossy color="primary" icon="home" @click="goHome()"> <q-tooltip>GO HOME</q-tooltip> </q-btn>
  </q-page-sticky>


</template>

<script>

import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import playerController from '../../controllers/playerController'
import notify from "../../helpers/notification"

export default {
  name: "PlayerSettings",
  components: {

  },

  setup() {
    const router = useRouter()

	  const $q = useQuasar()

    const { playerInfo } = playerController()

    onMounted(() => {
      setTimeout(function() {
        window.scroll(0, 0)
      }, 500)
    })

    const downloadConfig = () => {
      window.open(
        playerInfo.value.settings.configUrl,
        '_blank'
      )
    }

    const goHome = () => {
      router.push(`/`)
    }

    const openLink = (link) => {
      window.open(
        link,
        '_blank'
      )
    }

	  const copyToClipboard = (id) => {
      var sel, range
      var el = document.getElementById(id) //get element id

      if (window.getSelection && document.createRange) { //Browser compatibility
        sel = window.getSelection()
        sel.removeAllRanges()
        if(sel.toString() == ''){ //no text selection
          window.setTimeout(function(){
            range = document.createRange() //range object
            range.selectNodeContents(el) //sets Range
            sel.removeAllRanges() //remove all ranges from selection
            sel.addRange(range)//add Range to a Selection.

            document.execCommand('copy')
            notify().success("Copied!", "center")
          },1)
        }
      } else if (document.selection) { //older ie
        sel = document.selection.createRange()
        sel.removeAllRanges()
        if(sel.text == ''){ //no text selection
          range = document.body.createTextRange()//Creates TextRange object
          range.moveToElementText(el)//sets Range
          range.select()//make selection.

          document.execCommand('copy')
          notify().success("Copied!", "center")
        }
      }

    }

    return {
      router,
      playerInfo,
      onMounted,
      downloadConfig,
      goHome,
      openLink,
	    copyToClipboard
    }
  }

}
</script>

<style></style>
