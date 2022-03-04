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
            label="FACEIT STATS"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >
            <q-card class="bg-secondary no-shadow no-border">
              <q-card-section class="">
                <div class="row" >

                  <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12 text-white">

                    <div class="row q-pb-xs q-col-gutter-md" >
                      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                        <!---
						<div class="font-18 text-orange-4"> Skill Level </div>
                        <q-avatar rounded class="cursor-pointer " size="28px">
                          <img :src="getSkillLevelImage(player.games['csgo'].skill_level)" />
                        </q-avatar>
						-->

						<q-card class="bg-dark q-pa-sm text-center">
							<div class="font-18 text-yellow-8"> SKILL LEVEL </div>
							<q-avatar rounded class="cursor-pointer " size="28px">
								<img :src="getSkillLevelImage(player.games['csgo'].skill_level)" />
							</q-avatar>
						</q-card>

                      </div>

                      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                        <!--
							<div class="font-18 text-orange-4"> ELO </div>
                        <div class="font-16"> {{ player.games["csgo"].faceit_elo }} </div>
						-->

						<q-card class="bg-dark q-pa-sm text-center">
							<div class="font-18 text-yellow-8"> ELO </div>
							<div class="font-18"> {{ player.games["csgo"].faceit_elo }} </div>
						</q-card>

                      </div>

                      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                        <!--
							<div class="font-18 text-orange-4"> Matches </div>
                        <div class="font-16"> {{ playerStats["Matches"] }} </div>
						-->

						<q-card class="bg-dark q-pa-sm text-center">
							<div class="font-18 text-yellow-8"> MATCHES </div>
                        	<div class="font-18"> {{ playerStats["Matches"] }} </div>
						</q-card>
                      </div>

					<!--
                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Wins </div>
                        <div class="font-16"> {{ playerStats["Wins"] }} </div>
                      </div>
					  -->

                      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
						  <!--
                        <div class="font-18 text-orange-4"> Win Rate % </div>
                        <div class="font-16"> {{ playerStats["Win Rate %"] }} </div>
						-->

						<q-card class="bg-dark q-pa-sm text-center">
							<div class="font-18 text-yellow-8"> WIN RATE % </div>
                        	<div class="font-18"> {{ playerStats["Win Rate %"] }} </div>
						</q-card>
                      </div>

						<!--
                      <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                        <div class="font-18 text-orange-4"> Longest Win Streak </div>
                        <div class="font-16"> {{ playerStats["Longest Win Streak"] }} </div>
                      </div>
					  -->

                      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
						  <!--
                        <div class="font-18 text-orange-4"> Average K/D Ratio </div>
                        <div class="font-16"> {{ playerStats["Average K/D Ratio"] }} </div>
						-->

						<q-card class="bg-dark q-pa-sm text-center">
							<div class="font-18 text-yellow-8"> AVERAGE K/D RATIO </div>
                        	<div class="font-18"> {{ playerStats["Average K/D Ratio"] }} </div>
						</q-card>
                      </div>

                      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
						  <!--
                        <div class="font-18 text-orange-4"> Average Headshots % </div>
                        <div class="font-16"> {{ playerStats["Average Headshots %"] }} </div>
						-->

						<q-card class="bg-dark q-pa-sm text-center">
							<div class="font-18 text-yellow-8"> AVERAGE HEADSHOTS % </div>
                        	<div class="font-18"> {{ playerStats["Average Headshots %"] }} </div>
						</q-card>
                      </div>



                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            label="MAP STATS"
            default-opened
            header-class="text-white text-h6 bg-grey-9"
            expand-icon=" "
          >

            <q-table
              card-class="bg-secondary text-white"
              :grid="mode"
              :rows="mapStats ? mapStats : []"
              :columns="columns"
              :rows-per-page-options="[20]"
              row-key="oid"
              table-class=""
              color="primary"
              table-header-class="text-bold"
              title-class="text-bold"
			  hide-bottom
            >

            <template v-slot:body-cell-imgMap="props">
              <q-td :props="props">
                <img
                  :src="props.row.imgMap"
                  class="q-mr-sm q-pl-sm cursor-pointer"
                  width="100"
                />
              </q-td>
            </template>

          </q-table>

          </q-expansion-item>

        </q-list>
    </div>



  </div>

  <q-page-sticky position="bottom-left" :offset="[18, 5]" style="z-index:99999999">
    <q-btn size="md" round rounded glossy color="primary" icon="home" @click="goHome()"> <q-tooltip>GO HOME</q-tooltip> </q-btn>
  </q-page-sticky>


</template>

<script>
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import playerController from '../../controllers/playerController'

const columns = [
  {
    name: "imgMap",
    label: "",
    field: "imgMap",
    sortable: false,
    align: "center",
	style:"font-size:16px"
  },
  {
    name: "map",
    label: "Map",
    field: "map",
    sortable: true,
    align: "left",
  },
  {
    name: "matches",
    label: "Matches",
    field: "matches",
    sortable: false,
    align: "left",
  },
  {
    name: "winRate",
    label: "Win Rate %",
    field: "winRate",
    align: "left",
    sortable: false,
  },
  {
    name: "avgKills",
    label: "Average Kills",
    field: "avgKills",
    sortable: false,
    align: "left",
  },
  {
    name: "avgDeaths",
    label: "Average Deaths",
    field: "avgDeaths",
    sortable: false,
    align: "left",
  },
  {
    name: "avgKdRatio",
    label: "Average K/D Ratio",
    field: "avgKdRatio",
    sortable: false,
    align: "left",
  },
  {
    name: "avgHs",
    label: "Average Headshots %",
    field: "avgHs",
    sortable: false,
    align: "left",
  },
  {
    name: "avgTripleKills",
    label: "Average Triple Kills",
    field: "avgTripleKills",
    sortable: false,
    align: "left",
  },
  {
    name: "avgQuadroKills",
    label: "Average Quadro Kills",
    field: "avgQuadroKills",
    sortable: false,
    align: "left",
  },
  {
    name: "avgPentaKills",
    label: "Average Penta Kills",
    field: "avgPentaKills",
    sortable: false,
    align: "left",
  }
]

export default {
  name: "PlayerStats",
  components: {

  },

  setup(props, { emit }) {
    const router = useRouter()
    let mode = computed(() => {
      return !$q.screen.gt.sm
    })

    const $q = useQuasar()

    if(!$q.screen.gt.sm) {
      columns.shift()
    }

    onMounted(() => {
      setTimeout(function() {
        window.scroll(0, 0)
      }, 500)
    })



    const { playerInfo, player, playerStats, playerMapStats } = playerController()


    const mapStats = computed(() => {
      return playerMapStats.value && playerMapStats.value.length > 0
        ? playerMapStats.value.map((item) => ({
            ...item,
          }))
        : []
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

    let imageSize = () => {
      return (window.screen.width - 70).toString()
    }

    let getSkillLevelImage = (skill_level) => {
      return "skill_level_" + skill_level + ".svg"
    }

    return {
      columns,
      router,
      mode,
      playerInfo,
      player,
      playerStats,
      mapStats,
      onMounted,
      downloadConfig,
      goHome,
      openLink,
      imageSize,
      getSkillLevelImage
    }
  }

}
</script>

<style></style>
